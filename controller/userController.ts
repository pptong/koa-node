import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import UserDto from '../dto/userDto';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService';
import { IRoleService } from '../service/roleService';
import RoleService from '../service/impl/roleService';


@Controller('/user')
export default class UserController {

    userService: IUserService = new UserService();
    roleService: IRoleService = new RoleService();

    @Post('/getusers')
    public async GetUsers(@Body() userDto: UserDto) {
        return await this.userService.getUsers(userDto);
    }

    @Post('/getuser')
    public async GetUser(@Body() userDto: UserDto) {

        let user = await this.userService.getUser(userDto.id || -1);

        return user;
    }

    @Post('/createUser')
    public async CreateUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto);
    }
}