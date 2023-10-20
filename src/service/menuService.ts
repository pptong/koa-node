import MenuDto from "../dto/menuDto";
import UserDto from "../dto/userDto";

export interface IMenuService {
  getMenusByUser(_userDto: UserDto): Promise<Array<MenuDto>>;
  getAllMenus(): Promise<Array<MenuDto>>;
  //getMenusByRoleId(menuDto:MenuDto):Promise< MenuDto>;
}
