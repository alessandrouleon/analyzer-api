import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserFacade } from "../facade/user.facade";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "../usecases/create/create.user.usecase.dto";
import { InputUpdateUserUseCaseDto, OutputUpdateUserUseCaseDto } from "../usecases/update/update.user.usecase.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userFacade: UserFacade) { }

    @Post()
    async create(@Body() input: InputCreateUserUseCaseDto): Promise<OutputCreateUserUseCaseDto> {
        try {
            return await this.userFacade.create(input);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() input: InputUpdateUserUseCaseDto): Promise<OutputUpdateUserUseCaseDto> {
        try {
            input.id = id;
            return await this.userFacade.update(input);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<OutputCreateUserUseCaseDto> {
        try {
            return await this.userFacade.findById(id);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return await this.userFacade.delete(id);
        } catch (e) {
            if (e.name === 'DomainError') {
                throw new BadRequestException(e.errors);
            }
            throw e;
        }
    }
}