import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ServiceOrderFacade } from "../facade/service.order.facade";
import { InputCreateServiceOrderUseCaseDto, OutputCreateServiceOrderUseCaseDto } from "../usecases/create/create.service.order.usecase.dto";
import { InputFindServiceOrderUseCaseDto } from "../usecases/findAll/find-all.service.order.usecase.dto";
import { OutputFindByIdServiceOrderUseCaseDto } from "../usecases/findById/findById.service.order.usecase.dto";
import { InputUpdateServiceOrderUseCaseDto, OutputUpdateServiceOrderUseCaseDto } from "../usecases/update/update.service.order.usecase.dto";

@Controller('so')
export class ServiceOrderController {
    constructor(private readonly serviceOrderFacade: ServiceOrderFacade,
    ) { }

    @Post()
    async create(@Body() input: InputCreateServiceOrderUseCaseDto): Promise<OutputCreateServiceOrderUseCaseDto> {
        try {
            return await this.serviceOrderFacade.create(input);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() input: InputUpdateServiceOrderUseCaseDto): Promise<OutputUpdateServiceOrderUseCaseDto> {
        try {
            input.id = id;
            return await this.serviceOrderFacade.update(input);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<OutputFindByIdServiceOrderUseCaseDto> {
        try {
            return await this.serviceOrderFacade.findById(id);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }

    @Get()
    async find(@Query() query: InputFindServiceOrderUseCaseDto) {
        const filter: any = {};

        for (const key in query) {
            if (key.startsWith('filter[') && key.endsWith(']')) {
                const field = key.slice(7, -1);
                filter[field] = query[key];
            }
        }
        return this.serviceOrderFacade.find({ ...query, filter });
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return await this.serviceOrderFacade.delete(id);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }
}