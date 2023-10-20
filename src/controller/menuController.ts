import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from "routing-controllers";
import { LoginDto } from "../dto/loginDto";
import { IMenuService } from "../service/menuService";
import MenuService from "../service/impl/menuService";

@Controller("/menu")
export default class MenuController {
  menuService: IMenuService = new MenuService();

  @Post("/getallmenus")
  public async getAllMenus(@Body() loginDto: LoginDto) {
    const menuTree = await this.menuService.getAllMenus();
    return menuTree;
  }


}
