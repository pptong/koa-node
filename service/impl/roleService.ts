import { IRoleService } from "../roleService";
import UserDto from "../../dto/userDto";
import RoleDto from "../../dto/roleDto";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao

export default class RoleService implements IRoleService {
    public async getRoles(roleDto: RoleDto): Promise<Array<RoleDto>> {
        const roles = roleDao.findAll(RoleDto);
        return roles;
    }
    
    public async getRolesByUserId(userdto: UserDto): Promise<Array<RoleDto>> {
        const userRoles = await userRoleDao.getUserRolesByUserId(userdto.id || -1)
        const roleIds = userRoles.map(x => x.roleId || -1);
        const roles = await roleDao.findByIds(roleIds, RoleDto);
        return roles;
    }

    public async getRoleById(roleDto: RoleDto): Promise<RoleDto> {
        const role = roleDao.findById(roleDto.id || -1, RoleDto);
        return role;
    }

    public async getUsersByRoleID(roleDto: RoleDto): Promise<Array<UserDto>> {
        const userRoles = await userRoleDao.getUserRolesByUserId(roleDto.id || -1)
        const userids = userRoles.map(x => x.userId || -1);
        const users = userDao.findByIds(userids, UserDto)
        return users;
    }

    public async createRole(roleDto: RoleDto): Promise<boolean> {
        const role = await roleDao.create(roleDto);
        return true
    }

    public async deleteRole(roleDto: RoleDto): Promise<boolean> {
        return true;
    }
}



