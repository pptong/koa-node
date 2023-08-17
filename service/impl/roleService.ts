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

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao()
const menuPermissionDao = new MenuPermissionDao()

export default class RoleService implements IRoleService {
    public async getRoles(roleDto: RoleDto): Promise<Array<RoleDto>> {
        const roles = roleDao.findAll(RoleDto);
        return roles;
    }



    public async getRoleById(roleDto: RoleDto): Promise<RoleDto> {
        const role = await roleDao.findById(roleDto.id || -1, RoleDto);
        const userRoles = await userRoleDao.getUserRolesByUsername(roleDto.roleCode)
        const usernames = await userRoles.map(x => x.usernmae);
        const users = await userDao.getUsersByUsernames(usernames);
        role.users = users;
        return role;
    }



    public async createRole(roleDto: RoleDto): Promise<boolean> {

        const insertUsernames = roleDto.users?.map(x => x.username) || [];
        const insertMneuCodes = roleDto.menus?.map(x => x.menuCode) || [];

        //console.log(123);
        

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
        return true;
    }
}



