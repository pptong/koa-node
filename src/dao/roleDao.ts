import RoleDto from "../dto/roleDto";
import { Role } from "../models/role.model";
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model, ModelStatic, Op } from 'sequelize';

export default class RoleDao extends BaseDto<Model, RoleDto> {

    constructor() {
        super(Role,RoleDto);
    }

    public async getRolesByRoleCodes(_roleCodes: Array<string>): Promise<Array<RoleDto>> {
        
        if(_roleCodes.length==0) {
            const user = plainToInstance(RoleDto, []);
            return user;
        }

        const users = await Role.findAll({
            where: {
                roleCode: { [Op.or]: _roleCodes }
            }, raw: true
        });
        const user = plainToInstance(RoleDto, users);
        return user;
    }

}

