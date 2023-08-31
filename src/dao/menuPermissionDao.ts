import BaseDto from "./baseDao";
import { Model, Op } from "sequelize";
import MenuPermissionDto from '../dto/menuPermissionDto';
import { MenuPermission } from '../models/menuPermission.model';
import { plainToInstance } from "class-transformer";

export default class MenuPermissionDao extends BaseDto<Model, MenuPermissionDto> {
    constructor() { super(MenuPermission, MenuPermissionDto); }


    public async getMenuPermissionsByRoleCode(_roleCode: string): Promise<Array<MenuPermissionDto>> {
        const menuPermissions = await MenuPermission.findAll({ where: { roleCode: _roleCode }, raw: true })
        const menuPermissionDtos = plainToInstance(MenuPermissionDto, menuPermissions);
        return menuPermissionDtos;
    }

    public async getMenuPermissionsByRoleCodes(_roleCodes: string[]): Promise<Array<MenuPermissionDto>> {
        if(_roleCodes.length==0){
            const menuPermissionDtos = plainToInstance(MenuPermissionDto, []);
            return menuPermissionDtos;
        }
        const menuPermissions = await MenuPermission.findAll({ where: { roleCode: { [Op.or]: _roleCodes } }, raw: true })
        const menuPermissionDtos = plainToInstance(MenuPermissionDto, menuPermissions);
        return menuPermissionDtos;
    }
}


