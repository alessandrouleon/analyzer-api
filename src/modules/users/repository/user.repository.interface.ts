import { UserEntity } from "@/modules/users/domain/entities/user.entity";
import RepositoryInterface from "@/shared/repository/repository.interface";

export interface UserRepositoryInterface extends RepositoryInterface<UserEntity> {
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}