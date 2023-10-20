import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import UserDto from '../dto/userDto';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService';
import RoleDto from '../dto/roleDto';
import { IRoleService } from '../service/roleService';
import RoleService from '../service/impl/roleService';
import PageRequestDto from '../dto/public/pageRequestDto';


@Controller('/role')
export default class RoleController {

    roleService: IRoleService = new RoleService();



    @Post('/getroles')
    public async GetRoles(@Body() pageResquest: PageRequestDto) {
        return await this.roleService.getRoles(pageResquest);
    }




    @Post('/createrole')
    public async createRole(@Body() roleDto: RoleDto) {
        return await this.roleService.createRole(roleDto);
    }


    @Post('/getallroles')
    public async getAllRoles(@Body() roleDto: RoleDto) {
        return await this.roleService.getAllRoles(roleDto);
    }

    @Post('/updaterole')
    public async updateRole(@Body() roleDto: RoleDto) {
        return await this.roleService.updateRole(roleDto);
    }

    @Post('/getrole')
    public async getRole(@Body() roleDto: RoleDto) {
        return await this.roleService.getRoleById(roleDto);
    }

    @Post('/deleterole')
    public async deleteRole(@Body() roleDto: RoleDto) {
        return await this.roleService.deleteRole(roleDto);
    }
}