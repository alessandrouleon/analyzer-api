import { ROLES } from '@/@shared/constants/user.roles';
import { IdService } from '@/@shared/services/id.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../repository/user.repository.interface';
import { CreateUserUseCase } from './create.user.usecase';

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;
    let idServiceMock: jest.Mocked<IdService>;

    beforeEach(() => {
        userRepositoryMock = {
            create: jest.fn(),
        } as any;

        idServiceMock = {
            generate: jest.fn(),
        } as any;

        createUserUseCase = new CreateUserUseCase(userRepositoryMock, idServiceMock);
    });

    it('should create a new user successfully', async () => {
        const input = {
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'Abc@1234',
            role: ROLES.ADMIN,
        };


        const generatedId = 'abc123';
        idServiceMock.generate.mockReturnValue(generatedId);

        const createdUserEntity = new UserEntity({
            id: generatedId,
            name: input.name,
            username: input.username,
            email: input.email,
            password: input.password,
            role: input.role,
        });

        const userJson = {
            id: generatedId,
            name: input.name,
            username: input.username,
            email: input.email,
            role: input.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        jest.spyOn(createdUserEntity, 'toJSON').mockReturnValue(userJson);
        userRepositoryMock.create.mockResolvedValue(createdUserEntity);

        const result = await createUserUseCase.execute(input);

        expect(idServiceMock.generate).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.any(UserEntity));
        expect(result).toEqual(userJson);
    });

    it('should throw if repository.create fails', async () => {
        const input = {
            name: 'Jane Doe',
            username: 'janedoe',
            email: 'jane@example.com',
            password: 'Xyz@9876',
            role: ROLES.USER,
        };

        idServiceMock.generate.mockReturnValue('xyz789');
        userRepositoryMock.create.mockRejectedValue(new Error('Database error'));

        await expect(createUserUseCase.execute(input)).rejects.toThrow('Database error');
    });
});
