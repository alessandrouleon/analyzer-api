import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";
import { ServiceOrderFacade } from "../facade/service.order.facade";
import { UploadService } from "../services/upload.service";
import { InputCreateServiceOrderUseCaseDto, OutputCreateServiceOrderUseCaseDto } from "../usecases/create/create.service.order.usecase.dto";
import { InputFindServiceOrderUseCaseDto } from "../usecases/findAll/find-all.service.order.usecase.dto";
import { OutputFindByIdServiceOrderUseCaseDto } from "../usecases/findById/findById.service.order.usecase.dto";
import { InputUpdateServiceOrderUseCaseDto, OutputUpdateServiceOrderUseCaseDto } from "../usecases/update/update.service.order.usecase.dto";

@Controller('so')
export class ServiceOrderController {
    constructor(private readonly serviceOrderFacade: ServiceOrderFacade,
        private readonly uploadService: UploadService,
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

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/service-orders',
                filename: (req, file, callback) => {
                    const imageId = randomUUID();
                    const ext = extname(file.originalname);
                    callback(null, `${imageId}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return callback(
                        new BadRequestException('Apenas imagens PNG, JPG e JPEG são permitidas!'),
                        false,
                    );
                }
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
        })
    )
    async uploadFile(
        @Body() input: InputCreateServiceOrderUseCaseDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<OutputCreateServiceOrderUseCaseDto> {
        try {
            // Se houver arquivo, processa o upload
            if (file) {
                const uploadInfo = this.uploadService.processUploadedFile(file);

                // Adiciona as informações da imagem ao input
                input.image_id = uploadInfo.imageId;
                input.image_url = uploadInfo.imageUrl;
            }

            return await this.serviceOrderFacade.create(input);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }
}