import MenuDto from '../dto/menuDto'
import { Menu } from '../models/menu.model'
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model,Op } from "sequelize";

export default class MenuDao extends BaseDto<Model, MenuDto> {
    constructor() {
        super(Menu,MenuDto);
    }


    public async getMenusByMenuCodes(_menuCodes: Array<string>): Promise<Array<MenuDto>> {
        const menus = await Menu.findAll({
            where: {
                menuCode: { [Op.or]: _menuCodes }
            }, raw: true
        });
        const menusDtos = plainToInstance(MenuDto, menus);
        return menusDtos;
    }
}

