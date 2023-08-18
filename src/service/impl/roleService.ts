import { IRoleService } from "../roleService";
import UserDto from "../../dto/userDto";
import RoleDto from "../../dto/roleDto";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";
import UserRoleDto from "../../dto/userRoleDto";
import MenuPermissionDto from "../../dto/menuPermissionDto";
import MenuPermissionDao from "../../dao/menuPermissionDao";
import sequelize from "../../sequlize/sequlize";
import MenuDao from "../../dao/menuDao";

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao();
const menuPermissionDao = new MenuPermissionDao();
const menuDao = new MenuDao();

export default class RoleService implements IRoleService {
    public async getRoles(roleDto: RoleDto): Promise<Array<RoleDto>> {
        const roles = roleDao.findAll();
        return roles;
    }



    public async getRoleById(roleDto: RoleDto): Promise<RoleDto> {
        const role = await roleDao.findById(roleDto.id || -1);
        const userRoles = await userRoleDao.getUserRolesByUsername(roleDto.roleCode)
        const usernames = await userRoles.map(x => x.usernmae);
        const users = await userDao.getUsersByUsernames(usernames);
        const menuPermission = await menuPermissionDao.getMenuPermissionsByRoleCode(role.roleCode);
        const menuCodes = menuPermission.map(x => x.menuCode);
        const menus = await menuDao.getMenusByMenuCodes(menuCodes)

        role.menus = menus;
        role.users = users;
        return role;
    }



    public async updateRole(roleDto: RoleDto): Promise<boolean> {

        const currentUsernames = roleDto.users?.map(x => x.username || '') || [];
        const currentMneuCodes = roleDto.menus?.map(x => x.menuCode || '') || [];

        const dbUserRoles = await userRoleDao.getUserRolesByRoleCode(roleDto.roleCode);
        const dbMenuPermission = await menuPermissionDao.getMenuPermissionsByRoleCode(roleDto.roleCode);
        const dbUsernames = dbUserRoles.map(x => x.usernmae);
        const dbMenuCodes = dbMenuPermission.map(x => x.menuCode);

        //need to delete
        const deleteUserRoleIds = dbUserRoles.filter(x => !currentUsernames.includes(x.usernmae)).map(x => x.id || -1);
        const deleteMenuPermissionIds = dbMenuPermission.filter(x => !currentMneuCodes.includes(x.menuCode)).map(x => x.id || -1);

        //need to insert
        const insertUsernames = currentUsernames.filter(x => !dbUsernames.includes(x));
        const insertMenuCodes = dbMenuCodes.filter(x => !dbMenuCodes.includes(x));
        const insertUserRoles = insertUsernames.map(x => {
            let e = new UserRoleDto();
            e.roleCode = roleDto.roleCode;
            e.usernmae = x
            return e;
        });

        const insertMenuPermissions = insertMenuCodes.map(x => {
            let e = new MenuPermissionDto();
            e.roleCode = roleDto.roleCode;
            e.menuCode = x
            return e;
        });


        sequelize.transaction(async (t1) => {
            await roleDao.update(roleDto, roleDto.id || -1);
            await menuPermissionDao.deleteByIds(deleteMenuPermissionIds);
            await userRoleDao.deleteByIds(deleteUserRoleIds);
            await menuPermissionDao.batchCreate(insertMenuPermissions);
            await userRoleDao.batchCreate(insertUserRoles);
        });

        return false;
    }




    public async createRole(roleDto: RoleDto): Promise<boolean> {
        const insertUsernames = roleDto.users?.map(x => x.username || '') || [];
        const insertMneuCodes = roleDto.menus?.map(x => x.menuCode || '') || [];

        let userRoleDtos: Array<UserRoleDto> = [];
        for (let i = 0; i < insertUsernames.length; i++) {
            let userRoleDto = new UserRoleDto();
            userRoleDto.roleCode = roleDto.roleCode;
            userRoleDto.usernmae = insertUsernames[i];
            userRoleDtos.push(userRoleDto);
        }


        let menuPermissionDtos: Array<MenuPermissionDto> = [];
        for (let i = 0; i < insertMneuCodes.length; i++) {
            let menuPermissionDto = new MenuPermissionDto();
            menuPermissionDto.roleCode = roleDto.roleCode;
            menuPermissionDto.menuCode = insertMneuCodes[i];
            menuPermissionDtos.push(menuPermissionDto);
        }



        sequelize.transaction(async (t1) => {
            await roleDao.create(roleDto);
            await menuPermissionDao.batchCreate(menuPermissionDtos);
            await userRoleDao.batchCreate(userRoleDtos);
        });


        return true

    }

    public async deleteRole(roleDto: RoleDto): Promise<boolean> {
        roleDao.deleteById(roleDto.id || -1);
        return true;
    }
}



