import MenuDto from '../dto/menuDto'
import { Menu } from '../models/menu.model'
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model } from "sequelize";

export default class MenuDao extends BaseDto<Model, MenuDto> {
    constructor() {
        super(Menu,MenuDto);
    }
}

