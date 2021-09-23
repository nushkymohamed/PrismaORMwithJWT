import { CreateUserDTO } from 'src/dto/crreate-user.dto';
import { UpdateUSerDTO } from 'src/dto/update-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { LoginUserDTO } from 'src/dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    private JwtService;
    constructor(userService: UserService, JwtService: JwtService);
    createOne(createUserRequest: CreateUserDTO): Promise<import(".prisma/client").User>;
    posts(): Promise<import(".prisma/client").User[]>;
    post(userid: string): Promise<import(".prisma/client").User>;
    delete(args: string): Promise<import(".prisma/client").User>;
    update(userid: string, updateUserRequest: UpdateUSerDTO): Promise<import(".prisma/client").User>;
    register(name: string, email: string, password: string): Promise<import(".prisma/client").User>;
    login(data: LoginUserDTO, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
