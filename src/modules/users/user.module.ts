import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/user.model";
import { UserRepository } from "./repository/user.repository";
import { CreateUserUseCase } from "./usecases/create/create.user.usecase";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [],
    providers: [
        UserRepository,
        //Facade

        //UseCases
        CreateUserUseCase
    ],
    exports: []
})

export class UserModule { }