import { IdService } from "@/@shared/services/id.service";
import { Injectable, Logger } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepositoryInterface } from "../../repository/user.repository.interface";
import { InputCreateUserUseCaseDto, OutputCreateUserUseCaseDto } from "./create.user.usecase.dto";


@Injectable()
export class CreateUserUseCase {
   constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly idService: IdService
   ) { }

   async execute(input: InputCreateUserUseCaseDto): Promise<OutputCreateUserUseCaseDto> {

      const user = new UserEntity({
         id: this.idService.generate(),
         name: input.name,
         username: input.username,
         email: input.email,
         password: input.password,
         role: input.role
      });

      const userCreated = await this.userRepository.create(user);

      Logger.log(
         `User created. [ID: ${user.id}][name: ${user.name}]`,
         'CreateUserUseCase.execute',
      );

      return userCreated.toJSON();
   }
}