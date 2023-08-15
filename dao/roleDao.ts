import RoleDto from "../dto/roleDto";
import RoleModel from "../models/roleModels";
import { RoleField } from "../models/roleModels";
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model } from "sequelize";

export default class RoleDao extends BaseDto<Model, RoleDto> {

    constructor() {
        super(RoleModel,RoleField);
    }

}

