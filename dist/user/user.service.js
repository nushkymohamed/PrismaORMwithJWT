"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const crreate_user_dto_1 = require("../dto/crreate-user.dto");
const db_1 = require("../config/db");
const user_dto_1 = require("../dto/user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const register_user_dto_1 = require("../dto/register-user.dto");
const login_user_dto_1 = require("../dto/login-user.dto");
let UserService = class UserService {
    constructor() { }
    async createOne(data) {
        try {
            return db_1.prisma.user.create({
                data: Object.assign({}, data),
            });
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while get user data', 400);
        }
    }
    async getall() {
        try {
            return db_1.prisma.user.findMany({});
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while get user data', 400);
        }
    }
    async getbyid(id) {
        try {
            return db_1.prisma.user.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while get user by id', 400);
        }
    }
    async deleteUser(id) {
        try {
            return db_1.prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            });
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while Deleting data', 400);
        }
    }
    async updateUser(id, data) {
        try {
            return db_1.prisma.user.update({
                where: {
                    id: parseInt(id),
                },
                data: Object.assign({}, data),
            });
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while update data', 400);
        }
    }
    async rejister(data) {
        try {
            return db_1.prisma.user.create({
                data: Object.assign({}, data),
            });
        }
        catch (e) {
            throw new common_1.HttpException('Something went wrong while Rejister User', 400);
        }
    }
    async findOne(data) {
        try {
            return await db_1.prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
        }
        catch (e) {
            console.log('error is', e);
            throw new common_1.HttpException('Something went wrong With the Email ', 400);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map