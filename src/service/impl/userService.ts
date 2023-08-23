import UserDto from "../../dto/userDto";
import { LoginDto } from "../../dto/loginDto";
import { IUserService } from "../userService";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";
import sequelize from "../../sequlize/sequlize";
import UserRoleDto from "../../dto/userRoleDto";
import PageDto from "../../dto/public/pageDto";
import MenuDao from "../../dao/menuDao";
import MenuPermissionDao from "../../dao/menuPermissionDao";
import MD5 from "../../utils/md5";

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao();
const menuPermissionDao = new MenuPermissionDao()

export default class UserService implements IUserService {

    public async getUsers(pageDto: PageDto): Promise<UserDto[]> {
        const users = await userDao.findAllByPage(pageDto.pageSize, pageDto.pageIndex, {
            username: pageDto.query.username
        });
        return users;
    }


    public async verification(_loginDto: LoginDto): Promise<UserDto> {
        const userDto = new UserDto();
        userDto.password = MD5(_loginDto.password);
        userDto.username = _loginDto.username;
        const user = await userDao.findUser(userDto);
        return user;
    }

    public async getMenuCodesByUsername(username: string): Promise<string[]> {
        const userRoles = await userRoleDao.getUserRolesByUsername(username);
        const roleCodes = userRoles.map(x => x.roleCode);
        const menus = await menuPermissionDao.getMenuPermissionsByRoleCodes(roleCodes);
        const menuCodes = menus.map(x => x.menuCode);
        return menuCodes;
    }

    public async getUser(id: Number): Promise<UserDto> {
        const user = await userDao.findById(id);
        const userRoles = await userRoleDao.getUserRolesByUsername(user.username)
        const roleCodes = userRoles.map(x => x.roleCode);
        const roles = await roleDao.getRolesByRoleCodes(roleCodes);
        user.roles = roles;
        return user;
    }


    public async deleteUser(id: Number): Promise<boolean> {
        const user = await userDao.deleteById(id);
        return true;
    }


    public async createUser(_userDto: UserDto): Promise<boolean> {

        sequelize.transaction(async (t) => {
            _userDto.password = MD5("123456");
            const userId = await userDao.create(_userDto);
            let userRoleDtos: Array<UserRoleDto> = [];
            const roles = _userDto.roles || []
            for (let i = 0; i < roles.length; i++) {
                const userRoleDto = new UserRoleDto();
                userRoleDto.roleCode = roles[i].roleCode;
                userRoleDto.usernmae = _userDto.username;
                userRoleDtos.push(userRoleDto)
            }
            await userRoleDao.batchCreate(userRoleDtos)
        });
        return true
    }



    public async updateUser(_userDto: UserDto): Promise<boolean> {

        const dbUserRolesDto = await userRoleDao.getUserRolesByUsername(_userDto.username);
        const currentRoles = _userDto.roles || []
        const currentRoleCodes = currentRoles.map(x => x.roleCode);
        const insertUserRoleCodes = currentRoleCodes.filter(x => !currentRoleCodes.includes(x));
        let insertUserRoleDtos: Array<UserRoleDto> = [];
        for (let i = 0; i < insertUserRoleCodes.length; i++) {
            const userRoleDto = new UserRoleDto();
            userRoleDto.roleCode = insertUserRoleCodes[i];
            userRoleDto.usernmae = _userDto.username;
            insertUserRoleDtos.push(userRoleDto)
        }


        const deleteUserRoleIds = dbUserRolesDto.filter(x => !currentRoleCodes.includes(x.roleCode)).map(x => x.id || -1);

        sequelize.transaction(async (t) => {
            await userDao.update(_userDto, _userDto.id || -1);
            await userRoleDao.batchCreate(insertUserRoleDtos)
            await userRoleDao.deleteByIds(deleteUserRoleIds);
        });
        return true
    }
}



