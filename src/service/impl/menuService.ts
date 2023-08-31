import UserDto from "../../dto/userDto";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";
import PageDto from "../../dto/public/pageRequestDto";
import MenuDao from "../../dao/menuDao";
import MenuPermissionDao from "../../dao/menuPermissionDao";
import { IMenuService } from "../menuService";
import MenuDto from "../../dto/menuDto";

const menuDao = new MenuDao();
const userRoleDao = new UserRoleDao();
const menuPermissionDao = new MenuPermissionDao();

export default class MenuService implements IMenuService {
  public async getMenusByUser(_userDto: UserDto): Promise<MenuDto[]> {
    const roles = await userRoleDao.getUserRolesByUsername(_userDto.username);
    const roleCodes = roles.map((x) => x.roleCode);
    const menuPermission =
      await menuPermissionDao.getMenuPermissionsByRoleCodes(roleCodes);
    const menuCodes = menuPermission.map((x) => x.menuCode);
    const menu = await menuDao.getMenusByMenuCodes(menuCodes);
    const menuDtos = this.DtoToTree(menu);
    console.log(JSON.stringify(menuDtos));
    return menuDtos;
  }

  private DtoToTree(menuDto: MenuDto[], parentId: number = 0): MenuDto[] {
    const menus = menuDto.filter((x) => x.parentId == parentId);
    for (let i = 0; i < menus.length; i++) {
      const childrenMenu = this.DtoToTree(menuDto, menus[i].id);
      menus[i].children = childrenMenu.length > 0 ? childrenMenu : undefined;
    }
    return menus;
  }
}
