import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { UserRepositoryInterface } from "../../repository/user.repository.interface";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface
    ) { }

    async execute(id: string): Promise<void> {

        const existsUser = await this.userRepository.findOneById(id);

        if (!existsUser) {
            throw new BadRequestException(`User with ID ${id} not found`);
        }

        const deleteUser = await this.userRepository.delete(id);

        Logger.log(
            `User deleted. [ID: ${deleteUser.id}][name: ${deleteUser.name}]`,
            'DeleteUserUseCase.execute',
        );

    }
}
