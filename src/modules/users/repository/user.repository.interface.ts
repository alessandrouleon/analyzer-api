import RepositoryInterface from "@/@shared/repository/repository.interface";
import { UserEntity } from "../domain/entities/user.entity";

export interface UserRepositoryInterface extends RepositoryInterface<UserEntity> { }