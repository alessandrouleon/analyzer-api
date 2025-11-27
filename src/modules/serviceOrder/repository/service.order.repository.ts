import { FindFilterInterface, PaginationResultInterface } from "@/@shared/repository/repository.interface";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ServiceOrderEntity } from "../domain/entities/service.order.entity";
import { ServiceOrder, ServiceOrderDocument } from "../model/service.order.model";
import { ServiceOrderRepositoryInterface } from "./service.order.repository.interface";

@Injectable()
export class ServiceOrderRepository implements ServiceOrderRepositoryInterface {

    constructor(
        @InjectModel(ServiceOrder.name)
        private serviceOrderModel: Model<ServiceOrderDocument>,

    ) { }

    async create(entity: ServiceOrderEntity): Promise<ServiceOrderEntity> {
        const serviceOrderModel = this.entityToModel(entity);
        const saveServiceOrder = await this.serviceOrderModel.create(serviceOrderModel);

        if (!saveServiceOrder) {
            Logger.warn(`ServoiceOrder creation failed`, 'ServiceOrderRepository.create');
        }

        return this.modelToEntity(saveServiceOrder);
    }

    async update(entity: ServiceOrderEntity): Promise<ServiceOrderEntity> {
        const objId = new Types.ObjectId(entity.id);
        console.log(await this.serviceOrderModel.findById(objId));
        const originalDoc = await this.serviceOrderModel
            .findOne({
                _id: objId,
                $or: [
                    { deletedAt: { $exists: false } },
                    { deletedAt: null },
                ],
            })
            .setOptions?.({ autopopulate: false })
            .lean();

        if (!originalDoc) {
            throw new NotFoundException(`ServiceOrder ${entity.id} not found`);
        }

        const updatePayload = this.entityToModel(entity);

        if ((originalDoc as any)._id)
            (originalDoc as any)._id = String((originalDoc as any)._id);
        if ((originalDoc as any).__v !== undefined) delete (originalDoc as any).__v;


        const updatedDoc = await this.serviceOrderModel.findOneAndUpdate(
            { _id: objId },
            { $set: updatePayload },
            {
                new: true,
                runValidators: true,
                strict: true,
                writeConcern: { w: 'majority', wtimeout: 5000 },
            },
        );

        if (!updatedDoc) {
            Logger.warn(`Failed at update serviceOrder ${entity.id}`, 'ServiceOrderRepository.update');
            throw new NotFoundException('ServiceOrder not found');
        }

        const updatedSnap = updatedDoc.toObject();
        if ((updatedSnap as any)._id)
            (updatedSnap as any)._id = String((updatedSnap as any)._id);
        if ((updatedSnap as any).__v !== undefined) delete (updatedSnap as any).__v;

        return this.modelToEntity(updatedDoc);
    }

    async delete(_id: string): Promise<ServiceOrderEntity> {
        const objId = new Types.ObjectId(_id);

        const deleted = await this.serviceOrderModel
            .findOneAndUpdate(
                { _id: objId },
                { $set: { deletedAt: new Date() } },
                {
                    new: true,
                    strict: true,
                    runValidators: true,
                }
            )
            .setOptions?.({ autopopulate: false });

        if (!deleted) {
            Logger.warn(`Failed at delete serviceOrder ${_id}`, 'ServiceOrderRepository.delete');
            throw new NotFoundException(`ServiceOrder ${_id} not found`);
        }

        const originalSnap = deleted.toObject();

        if (originalSnap?._id) {
            originalSnap._id = originalSnap._id;
        }

        return this.modelToEntity(deleted);
    }

    async findOneById(id: string): Promise<ServiceOrderEntity> {
        const serviceOrder = await this.serviceOrderModel.findOne({
            _id: new Types.ObjectId(id), $or: [
                { deletedAt: { $exists: false } },
                { deletedAt: null },
            ]
        }).exec();
        if (!serviceOrder) return null;

        return this.modelToEntity(serviceOrder);
    }

    async find(query: FindFilterInterface): Promise<PaginationResultInterface<ServiceOrderEntity>> {
        const {
            filter = {},
            order = "desc",
            orderby = "createdAt",
            limit = 25,
            page = 1,
            skip = (page - 1) * limit,
        } = query;

        const queryBuild = {};
        const $or = [];

        if (filter.name) {
            $or.push({ name: { $regex: filter.name, $options: 'i' } });
        } else if (filter.search) {
            $or.push({ name: { $regex: filter.search, $options: 'i' } });
        }

        // $or.push(
        //     { deletedAt: { $exists: false } },
        //     { deletedAt: null },
        // );

        if ($or.length > 0) {
            queryBuild['$or'] = $or;
        }

        const total = await this.serviceOrderModel.countDocuments(queryBuild).exec();
        const totalPages = Math.ceil(total / limit);

        const findQuery = this.serviceOrderModel
            .find(queryBuild)
            .sort({ [orderby]: order === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const serviceOrders = await findQuery.exec();

        return {
            result: serviceOrders.map((serviceOrder) => this.modelToEntity(serviceOrder)),
            pagination: {
                page: Number(page),
                totalPages,
                size: limit,
                total,
            }
        }
    }

    private modelToEntity(serviceOrderModel: ServiceOrder): ServiceOrderEntity {
        const serviceOrderEntity = new ServiceOrderEntity(
            {
                id: serviceOrderModel._id.toString(),
                name: serviceOrderModel.name,
                description: serviceOrderModel.description,
                service_order_number: serviceOrderModel.service_order_number,
                issue_date: serviceOrderModel.issue_date,
                expected_delivery_date: serviceOrderModel.expected_delivery_date,
                status: serviceOrderModel.status,
                priority: serviceOrderModel.priority,
                common_defects: serviceOrderModel.common_defects,
                accessories: serviceOrderModel.accessories,
                physical_condition: serviceOrderModel.physical_condition,
                tests_performed: serviceOrderModel.tests_performed,
                image_url: serviceOrderModel.image_url,
                createdAt: serviceOrderModel.createdAt,
                updatedAt: serviceOrderModel.updatedAt,
                deletedAt: serviceOrderModel.deletedAt
            }
        );

        return serviceOrderEntity;
    }

    private entityToModel(entity: ServiceOrderEntity): ServiceOrder {
        const serviceOrderModel = new this.serviceOrderModel({
            _id: new Types.ObjectId(entity.id),
            name: entity.name,
            description: entity.description,
            service_order_number: entity.service_order_number,
            issue_date: entity.issue_date,
            expected_delivery_date: entity.expected_delivery_date,
            status: entity.status,
            priority: entity.priority,
            common_defects: entity.common_defects,
            accessories: entity.accessories,
            physical_condition: entity.physical_condition,
            tests_performed: entity.tests_performed,
            image_url: entity.image_url,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        });

        return serviceOrderModel;
    }


}