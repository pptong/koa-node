import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import  UserDto  from '../dto/userDto';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService'; 
import RoleDto from '../dto/roleDto';
import { IRoleService } from '../service/roleService';
import RoleService from '../service/impl/roleService';


@Controller('/role')
export default class RoleController {

    roleService: IRoleService = new RoleService();


    @Post('/createrole')
    public async createRole(@Body() roleDto: RoleDto) {
        //console.log(123)
        //console.log(roleDto)
        return await this.roleService.createRole(roleDto);
    }


}