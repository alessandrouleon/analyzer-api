import { HashService } from "@/@shared/services/hash.service";
import { IdService } from "@/@shared/services/id.service";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard } from "../auth/guard/auth.guard";
import { RolesGuard } from "../auth/guard/roles.guard";
import { UserController } from "./controllers/user.controller";
import { UserFacade } from "./facade/user.facade";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repository/user.repository";
import { CreateUserUseCase } from "./usecases/create/create.user.usecase";
import { DeleteUserUseCase } from "./usecases/delete/delete.user.usecase";
import { FindAllUserUseCase } from "./usecases/findAll/find-all.user.usecase";
import { FindByIdUserUseCase } from "./usecases/findById/findById.user.usecase";
import { LoginUserUseCase } from "./usecases/login/login-use.use-case";
import { UpdateUserUseCase } from "./usecases/update/update.user.usecase";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
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
        CreateUserUseCase,
        UpdateUserUseCase,
        FindByIdUserUseCase,
        FindAllUserUseCase,
        DeleteUserUseCase,
        LoginUserUseCase
    ],
    exports: [LoginUserUseCase]
})

export class UserModule { }