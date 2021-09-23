import { CreateUserDTO } from 'src/dto/crreate-user.dto';
import { User } from '.prisma/client';
import { UpdateUSerDTO } from 'src/dto/update-user.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { LoginUserDTO } from 'src/dto/login-user.dto';
export declare class UserService {
    constructor();
    createOne(data: CreateUserDTO): Promise<User>;
    getall(): Promise<User[]>;
    getbyid(id: string): Promise<User | null>;
    deleteUser(id: string): Promise<User>;
    updateUser(id: string, data: UpdateUSerDTO): Promise<User>;
    rejister(data: RegisterUserDTO): Promise<User>;
    findOne(data: LoginUserDTO): Promise<User>;
}
