import BaseDto from "./baseDao";
import { Model } from "sequelize";
import MenuPermissionDto from '../dto/menuPermissionDto';
import { MenuPermission } from '../models/menuPermission.model';
import { plainToInstance } from "class-transformer";

export default class MenuPermissionDao extends BaseDto<Model, MenuPermissionDto> {
    constructor() { super(MenuPermission,MenuPermissionDto);}


    public async getMenuPermissionsByUsername(_username: string): Promise<Array<MenuPermissionDto>> {
        const menuPermissions = await MenuPermission.findAll({ where: { username: _username }, raw: true })
        const menuPermissionDtos = plainToInstance(MenuPermissionDto, menuPermissions);
        return menuPermissionDtos;
    }


    public async getMenuPermissionsByRoleCode(_roleCode: string): Promise<Array<MenuPermissionDto>> {
        const menuPermissions = await MenuPermission.findAll({ where: { roleCode: _roleCode }, raw: true })
        const menuPermissionDtos = plainToInstance(MenuPermissionDto, menuPermissions);
        return menuPermissionDtos;
    }
}

