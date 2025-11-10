import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { UserFacade } from "../facade/user.facade";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "../usecases/create/create.user.usecase.dto";

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
}