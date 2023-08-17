import UserRoleDto from '../dto/userRoleDto';
import BaseDto from "./baseDao";
import { Model } from "sequelize";
import {UserRole} from '../models/userRole.model';
import { plainToInstance } from 'class-transformer';


export default class UserRoleDao extends BaseDto<Model, UserRoleDto> {
    constructor() {
        super(UserRole);
    }

    public async getUserRolesByUsername(_username: string): Promise<Array<UserRoleDto>> {
        const userRoles = await UserRole.findAll({ where: { username: _username }, raw: true })
        const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
        return userRoleDtos;
    }


    public async getUserRolesByRoleCode(_roleCode: string): Promise<Array<UserRoleDto>> {
        const userRoles = await UserRole.findAll({ where: { roleCode: _roleCode }, raw: true })
        const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
        return userRoleDtos;
    }
}

