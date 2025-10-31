import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';
import { BaseRepository } from '../../../../@shared/repository/base-repository';
import { SupplierEntity } from '../../domain/supplier.entity';
import { Supplier, SupplierDocument } from '../../model/supplier.model';
import {
  FindAllSuppliersFilter,
  FindAllSuppliersResult,
} from './supplier.repository.dto';

@Injectable()
export class SupplierRepository extends BaseRepository {
  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<SupplierDocument>,
  ) {
    super();
  }

  async create(entity: SupplierEntity): Promise<SupplierEntity> {
    const model = this.entityToModel(entity);
    const doc = await this.supplierModel.create(model);

    return this.modelToEntity(doc);
  }

  async update(entity: SupplierEntity) {
    const objId = new Types.ObjectId(entity.id);

    const originalDoc = await this.supplierModel
      .findById(objId)
      .setOptions?.({ autopopulate: false })
      .lean();

    if (!originalDoc) {
      throw new NotFoundException('Supplier not found');
    }

    if ((originalDoc as any)._id)
      (originalDoc as any)._id = String((originalDoc as any)._id);
    if ((originalDoc as any).__v !== undefined) delete (originalDoc as any).__v;

    const updatedDoc = await this.supplierModel
      .findOneAndUpdate(
        { _id: objId },
        { $set: this.entityToModel(entity) },
        {
          new: true,
          runValidators: true,
          strict: true,
          writeConcern: { w: 'majority', wtimeout: 5000 },
        },
      )
      .setOptions?.({ autopopulate: false });

    if (!updatedDoc) {
      throw new NotFoundException('Supplier not found after update');
    }

    const updatedSnap = updatedDoc.toObject();
    if ((updatedSnap as any)._id)
      (updatedSnap as any)._id = String((updatedSnap as any)._id);
    if ((updatedSnap as any).__v !== undefined) delete (updatedSnap as any).__v;

    return updatedDoc;
  }

  async delete(id: string) {
    const objId = new Types.ObjectId(id);

    const deleted = await this.supplierModel
      .findOneAndDelete({ _id: objId }, { projection: { __v: 0 } } as any)
      .setOptions?.({ autopopulate: false })
      .populate('supplier');

    if (!deleted) {
      throw new NotFoundException('Supplier not found');
    }

    const originalSnap = deleted.toObject();
    if ((originalSnap as any)._id)
      (originalSnap as any)._id = String((originalSnap as any)._id);

    return deleted;
  }

  async findAll(
    filter: FindAllSuppliersFilter,
  ): Promise<FindAllSuppliersResult> {
    const {
      search,
      page = 1,
      size = 10,
      sortBy = 'name',
      sort = 'asc',
    } = filter;

    const query = {};

    if (search) {
      query['$or'] = [
        { name: { $regex: new RegExp(search, 'i') } },
        { cnpj: { $regex: new RegExp(search, 'i') } },
      ];
    }

    const skip = (page - 1) * size;
    const order: Record<string, SortOrder> = {
      [sortBy]: sort === 'asc' ? 1 : -1,
    };

    const [items, total] = await Promise.all([
      this.supplierModel.find(query).sort(order).skip(skip).limit(size).exec(),
      this.supplierModel.countDocuments(query).exec(),
    ]);

    return {
      items: items.map((doc) => this.modelToEntity(doc)),
      total,
      page,
      size,
    };
  }

  async findById(id: string): Promise<SupplierEntity | null> {
    const doc = await this.supplierModel
      .findById(new Types.ObjectId(id))
      .exec();
    if (!doc) return null;

    return this.modelToEntity(doc);
  }

  private entityToModel(entity: SupplierEntity): Supplier {
    return new this.supplierModel({
      _id: new Types.ObjectId(entity.id),
      name: entity.name,
      contactEmail: entity.contactEmail,
      phoneNumber: entity.phoneNumber,
      cnpj: entity.cnpj,
      website: entity.website,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private modelToEntity(doc: SupplierDocument): SupplierEntity {
    return new SupplierEntity(doc._id.toString(), {
      name: doc.name,
      contactEmail: doc.contactEmail,
      phoneNumber: doc.phoneNumber,
      cnpj: doc.cnpj,
      website: doc.website,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
