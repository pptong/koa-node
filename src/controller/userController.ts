import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import UserDto from '../dto/userDto';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService';
import { IRoleService } from '../service/roleService';
import RoleService from '../service/impl/roleService';
import PageRequestDto from '../dto/public/pageRequestDto';


@Controller('/user')
export default class UserController {

    userService: IUserService = new UserService();


    @Post('/getusers')
    public async GetUsers(@Body() pageResquest: PageRequestDto) {
        return await this.userService.getUsers(pageResquest);
    }

    @Post('/getuser')
    public async GetUser(@Body() userDto: UserDto) {
        let user = await this.userService.getUser(userDto.id || -1);
        return user;
    }

    @Post('/createuser')
    public async CreateUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto);
    }


    @Post('/updateuser')
    public async UpdateUser(@Body() userDto: UserDto) {
        return await this.userService.updateUser(userDto);
    }

    @Post('/deleteuser')
    public async deleteUser(@Body() userDto: UserDto) {
        return await this.userService.deleteUser(userDto.id || -1);
    }
}