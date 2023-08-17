import UserRoleDto from '../dto/userRoleDto';
import BaseDto from "./baseDao";
import { Model } from "sequelize";
import {UserRole} from '../models/userRole.model';
import { plainToInstance } from 'class-transformer';


export default class UserRoleDao extends BaseDto<Model, UserRoleDto> {
    constructor() {
        super(UserRole);
    }

    public async getUserRolesByUserId(userId: Number): Promise<Array<UserRoleDto>> {
        const userRoles = await UserRole.findAll({ where: { userId: userId }, raw: true })
        const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
        return userRoleDtos;
    }


    public async getUserRolesByRoleId(roleId: Number): Promise<Array<UserRoleDto>> {
        const userRoles = await UserRole.findAll({ where: { roleId: roleId }, raw: true })
        const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
        return userRoleDtos;
    }
}

