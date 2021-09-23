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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const crreate_user_dto_1 = require("../dto/crreate-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const user_service_1 = require("./user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const login_user_dto_1 = require("../dto/login-user.dto");
const user_dto_1 = require("../dto/user.dto");
let UserController = class UserController {
    constructor(userService, JwtService) {
        this.userService = userService;
        this.JwtService = JwtService;
    }
    async createOne(createUserRequest) {
        const resp = await this.userService.createOne(createUserRequest);
        return resp;
    }
    async posts() {
        return this.userService.getall();
    }
    async post(userid) {
        return this.userService.getbyid(userid);
    }
    async delete(args) {
        return this.userService.deleteUser(args);
    }
    async update(userid, updateUserRequest) {
        return this.userService.updateUser(userid, updateUserRequest);
    }
    async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.userService.rejister({
            name,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return user;
    }
    async login(data, response) {
        const user = await this.userService.findOne(data);
        if (!user) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        if (!(await bcrypt.compare(data.password, user.password))) {
            throw new common_1.BadRequestException('invalid credentials');
        }
        const jwt = await this.JwtService.signAsync({ id: user.id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return {
            message: 'User Login successful',
        };
    }
    async user(request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.JwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            return data;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie('jwt');
        return {
            message: 'Succesfully Logout Comeback again! ',
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crreate_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "posts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "post", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUSerDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map