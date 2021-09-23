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

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private JwtService: JwtService,
  ) {}

  // Create user
  @Post()
  @UsePipes(ValidationPipe)
  public async createOne(@Body() createUserRequest: CreateUserDTO) {
    const resp = await this.userService.createOne(createUserRequest);

    return resp;
  }

  //Get All user
  @Get()
  async posts() {
    return this.userService.getall();
  }

  //Get user By ID
  @Get('/:id')
  async post(@Param('id') userid: string) {
    return this.userService.getbyid(userid);
  }

  // Delete a User
  @Delete('/:id')
  async delete(@Param('id') args: string) {
    return this.userService.deleteUser(args);
  }

  //Update User
  /* @Put('/:id')
  async updates(@Body() updateUserRequest: UpdateUSerDTO) {
    return this.userService.updateUser('id', updateUserRequest);
  }*/
  @Put('/:id')
  async update(
    @Param('id') userid: string,
    @Body() updateUserRequest: UpdateUSerDTO,
  ) {
    return this.userService.updateUser(userid, updateUserRequest);
  }

  /*JWT REGISTER LOGIN COOKIE */

  //Register
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
  @Post('login')
  async login(
    @Body() data: LoginUserDTO,
    // @Body('email') email: string,
    // @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne(data);

    // console.log('received data is', data, user);
    // return data;

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

  //get user
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.JwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      // const user = await this.userService.findOne({email:data[] });

      // const { password, ...result } = user;

      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // Logout
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Succesfully Logout Comeback again! ',
    };
  }
}
