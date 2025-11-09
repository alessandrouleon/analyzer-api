import { HashService } from "@/@shared/services/hash.service";
import { IdService } from "@/@shared/services/id.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserFacade } from "./facade/user.facade";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repository/user.repository";
import { CreateUserUseCase } from "./usecases/create/create.user.usecase";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [
        UserRepository,
        //Facade
        UserFacade,
        //Services
        IdService,
        HashService,
        //Repositories
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository,
        },
        //UseCases
        CreateUserUseCase
    ],
    exports: []
})

export class UserModule { }