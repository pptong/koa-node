import RoleDto from "../dto/roleDto";
import {Role} from "../models/roleModels";
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model } from "sequelize";

export default class RoleDao extends BaseDto<Model, RoleDto> {

    constructor() {
        super(Role);
    }

}

