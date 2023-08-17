import UserDto from "../../dto/userDto";
import { LoginDto } from "../../dto/loginDto";
import { IUserService } from "../userService";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";
import RoleDto from "../../dto/roleDto";
import { Sequelize } from "sequelize-typescript";
import sequelize from "../../sequlize/sequlize";
import UserRoleDto from "../../dto/userRoleDto";

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao();

export default class UserService implements IUserService {
    public async getUsers(userDto: UserDto): Promise<UserDto[]> {
        //const users = await userDao.getUsers({});
        const users = await userDao.findAll(UserDto);
        //const userDtos  = plainToInstance(UserDto,users);
        return users;
    }


    public async verification(_loginDto: LoginDto): Promise<UserDto> {
        const userDto = new UserDto();
        userDto.password = _loginDto.password;
        userDto.username = _loginDto.username;
        const user = await userDao.findUser(userDto);
        return user;
    }

    public async getUser(id: Number): Promise<UserDto> {
        const user = await userDao.findById(id, UserDto);
        const userRoles = await userRoleDao.getUserRolesByUserId(id)
        const roleIds = userRoles.map(x => x.roleId || -1);
        const roles = await roleDao.findByIds(roleIds, RoleDto);
        user.roles = roles;
        return user;
    }


    public async createUser(_userDto: UserDto): Promise<boolean> {

        sequelize.transaction(async (t) => {
            //namespace.get('transaction') === t1; // true
            const userId = await userDao.create(_userDto);
            let userRoleDtos: Array<UserRoleDto> = [];
            const roles = _userDto.roles || []
            for (let i = 0; i < roles.length; i++) {
                const userRoleDto = new UserRoleDto();
                userRoleDto.roleId = roles[i].id;
                userRoleDto.userId = userId;
                userRoleDtos.push(userRoleDto)
            }
            await userRoleDao.batchCreate(userRoleDtos)
        });
        return true
    }



    public async updateUser(_userDto: UserDto): Promise<boolean> {

        const dbUserRolesDto = await userRoleDao.getUserRolesByUserId(_userDto.id || -1);
        const dbUserRoleIds = dbUserRolesDto.map(x => x.id || -1);
        const currentRoles = _userDto.roles || []
        const currentRoleIds = currentRoles.map(x => x.id || -1);
        const deleteUserRoleIds = dbUserRoleIds.filter(x => !currentRoleIds.includes(x));
        const insertUserRoleIds = currentRoleIds.filter(x => !dbUserRoleIds.includes(x));


        let insertUserRoleDtos: Array<UserRoleDto> = [];
        for (let i = 0; i < insertUserRoleIds.length; i++) {
            const userRoleDto = new UserRoleDto();
            userRoleDto.roleId = insertUserRoleIds[i];
            userRoleDto.userId = _userDto.id;
            insertUserRoleDtos.push(userRoleDto)
        }

        sequelize.transaction(async (t) => {
            //namespace.get('transaction') === t1; // true
            await userDao.update(_userDto);
            await userRoleDao.batchCreate(insertUserRoleDtos)
            await userRoleDao.deleteByIds(deleteUserRoleIds);
        });
        return true
    }
}



