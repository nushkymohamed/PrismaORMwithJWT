import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/crreate-user.dto';
import { prisma } from 'src/config/db';
import { Prisma, User } from '.prisma/client';
import { UserDTO } from 'src/dto/user.dto';
import { UpdateUSerDTO } from 'src/dto/update-user.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import { parse } from 'url';

@Injectable()
export class UserService {
  constructor() {}

  public async createOne(data: CreateUserDTO) {
    // Create user in DB
    try {
      return prisma.user.create({
        data: { ...data },
      });
    } catch (e) {
      throw new HttpException('Something went wrong while get user data', 400);
    }
  }
  // get all user
  async getall(): Promise<User[]> {
    try {
      return prisma.user.findMany({});
    } catch (e) {
      throw new HttpException('Something went wrong while get user data', 400);
    }
  }

  //get user by id
  async getbyid(id: string): Promise<User | null> {
    try {
      return prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    } catch (e) {
      throw new HttpException('Something went wrong while get user by id', 400);
    }
  }

  //delete a user
  async deleteUser(id: string): Promise<User> {
    try {
      return prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (e) {
      throw new HttpException('Something went wrong while Deleting data', 400);
    }
  }

  //Update User
  async updateUser(id: string, data: UpdateUSerDTO): Promise<User> {
    try {
      return prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: { ...data },
      });
    } catch (e) {
      throw new HttpException('Something went wrong while update data', 400);
    }
  }

  /*------------For Login and JWT Token----------------*/

  //rejister user
  // async rejisters(data: any): Promise<User> {
  //   return this.createOne(data);
  // }

  //Rejister User
  async rejister(data: RegisterUserDTO) {
    try {
      return prisma.user.create({
        data: { ...data },
      });
    } catch (e) {
      throw new HttpException('Something went wrong while Rejister User', 400);
    }
  }

  //to get user by email
  // async findOne(condition: any): Promise<User> {
  //   return this.userRepository.findOne(condition);
  // }

  //to get user by email
  async findOne(data: LoginUserDTO): Promise<User> {
    try {
      return await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
    } catch (e) {
      console.log('error is', e);
      throw new HttpException('Something went wrong With the Email ', 400);
    }
  }

  //get user by email
  // async findOne(condition: any): Promise<User | null> {
  //   return prisma.user.findUnique({
  //     where: {
  //       id: parseInt(condition),
  //       email: 'user12@example.com',
  //     },
  //   });
  // }

  // async findOne(email: string): Promise<User> {
  //   return prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }

  //get user by email
  /* async findOne(id: string, email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: parseInt(id),
        email: 'elsa@prisma.io',
      },
    });
  }*/

  // async findOne(req, res) {
  //   // Destructure username from req.body
  //   const { email } = req.body;

  //   if (email == null) throw new Error('email undefined');

  //   // when property and value is same, you can write 'findOne' like below
  //   prisma.user
  //     .findUnique({
  //       where: { email },
  //       select: { email: true },
  //     })
  //     .then((data) => {
  //       res.send({
  //         userExists: data ? true : false,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || 'Some error occurred while retrieving email.',
  //       });
  //     })
  //     .finally(async () => {
  //       await prisma.$disconnect();
  //     });
  // }
}
