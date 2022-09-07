import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  Put,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { pipe } from 'rxjs';
import { CreateUserDTO } from 'src/dto/crreate-user.dto';
import { UpdateUSerDTO } from 'src/dto/update-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import { UserDTO } from 'src/dto/user.dto';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private JwtService: JwtService,
  ) {}

  /*JWT REGISTER/LOGIN/Logout with COOKIE */

  //Register
  //localhost:3007/auth/register   -> POST
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.rejister({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }

  // Login
  //localhost:3007/auth/login   -> POST
  @Post('login')
  async login(
    @Body() data: LoginUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne(data);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.JwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'User Login successful',
    };
  }
  // Logout
  //localhost:3007/auth/logout   ->POST
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Successfully Logged out Comeback again! ',
    };
  }

  //get user
  // localhost:3007/auth/user  ->GET
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.JwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  //Get All users
  // localhost:3007/auth/users   ->GET
  @Get('users')
  async posts() {
    return this.userService.getall();
  }
  //Get user By ID
  // localhost:3007/auth/users/id  -> GET/id
  @Get('users/:id')
  async post(@Param('id') userid: string) {
    return this.userService.getbyid(userid);
  }

  // Delete a User
  // localhost:3007/auth/users/id ->DELETE
  @Delete('users/:id')
  async delete(@Param('id') args: string) {
    return this.userService.deleteUser(args);
  }

  // Update users
  // localhost:3007/auth/users  ->PUT
  @Put('users/:id')
  async update(
    @Param('id') userid: string,
    @Body() updateUserRequest: UpdateUSerDTO,
  ) {
    return this.userService.updateUser(userid, updateUserRequest);
  }
}
