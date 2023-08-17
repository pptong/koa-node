import BaseDto from "./baseDao";
import { Model } from "sequelize";
import MenuPermissionDto from '../dto/menuPermissionDto';
import { MenuPermission } from '../models/menuPermission.model';

export default class MenuPermissionDao extends BaseDto<Model, MenuPermissionDto> {
    constructor() {
        super(MenuPermission);
    }
}

