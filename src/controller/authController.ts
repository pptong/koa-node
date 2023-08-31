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
import jsonwebtoken from "jsonwebtoken";
import { JwtConfig } from "../config";
import UserService from "../service/impl/userService";
import { IUserService } from "../service/userService";
import { ErrorCode } from "../error/errorCode";
import { MenuPermission } from "../models/menuPermission.model";
import CurrentUser from "../utils/currentUser";
import menuService from "../service/impl/menuService";
import { IMenuService } from "../service/menuService";
import MenuService from "../service/impl/menuService";
import UserDto from "../dto/userDto";

@Controller("/auth")
export default class AuthController {
  userService: IUserService = new UserService();
  menuService: IMenuService = new MenuService();

  @Post("/login")
  public async GetUser(@Body() loginDto: LoginDto) {
    const user = await this.userService.verification(loginDto);
    if (!user) {
      throw new Error(ErrorCode.AuthFailed.code);
    }
    const token = jsonwebtoken.sign(
      { user },
      Buffer.from(JwtConfig.jwtSecret),
      { expiresIn: "3h" }
    );
    return {
      token: token,
    };
  }

  @Post("/info")
  public async GetInfo() {
    const user = CurrentUser.getCurrentUser();
    return user;
  }

  @Post("/menus")
  public async GetMenus() {
    const user = CurrentUser.getCurrentUser();
    const userDto = new UserDto();
    userDto.username = user.username;
    const menus = await this.menuService.getMenusByUser(userDto);
    //console.log(userDto.username)
    return menus;
  }
}
