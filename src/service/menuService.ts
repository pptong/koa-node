import MenuDto from "../dto/menuDto";

export interface IMenuService
{
    getMenus(menuDto:MenuDto):Promise< Array<MenuDto>>;
    getMenusByRoleId(menuDto:MenuDto):Promise< MenuDto>;
}