import UserRoleDto from "../dto/userRoleDto";
import { Model } from "sequelize";
import { UserRole } from "../models/userRole.model";
import { plainToInstance } from "class-transformer";
import BaseDao from "./baseDao";

export default class UserRoleDao extends BaseDao<Model, UserRoleDto> {
  constructor() {
    super(UserRole, UserRoleDto);
  }

  public async getUserRolesByUsername( _username: string): Promise<Array<UserRoleDto>> {
    const userRoles = await UserRole.findAll({
      where: { username: _username },
      raw: true,
    });
    const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
    return userRoleDtos;
  }

  public async getUserRolesByRoleCode( _roleCode: string ): Promise<Array<UserRoleDto>> {
    const userRoles = await UserRole.findAll({
      where: { roleCode: _roleCode },
      raw: true,
    });
    const userRoleDtos = plainToInstance(UserRoleDto, userRoles);
    return userRoleDtos;
  }

  public async deleteByUsername(_username: string): Promise<boolean> {
    await UserRole.destroy({ where: { username: _username } });
    return true;
  }
}
