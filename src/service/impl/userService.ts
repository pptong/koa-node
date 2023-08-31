import UserDto from "../../dto/userDto";
import { LoginDto } from "../../dto/loginDto";
import { IUserService } from "../userService";
import UserDao from "../../dao/userDao";
import RoleDao from "../../dao/roleDao";
import UserRoleDao from "../../dao/userRoleDao";
import sequelize from "../../sequlize/sequlize";
import UserRoleDto from "../../dto/userRoleDto";
import PageDto from "../../dto/public/pageRequestDto";
import MenuDao from "../../dao/menuDao";
import MenuPermissionDao from "../../dao/menuPermissionDao";
import MD5 from "../../utils/md5";
import { Op } from "sequelize";
import PageResponseDto from "../../dto/public/pageResponseDto";

const userDao = new UserDao();
const roleDao = new RoleDao();
const userRoleDao = new UserRoleDao();
const menuPermissionDao = new MenuPermissionDao();

export default class UserService implements IUserService {
  // 查询用户列表
  public async getUsers(pageDto: PageDto): Promise<PageResponseDto<UserDto>> {
    const _where: any = {};
    if (pageDto.query) {
      if (pageDto.query.username)
        _where.username = { [Op.substring]: pageDto.query.username };
      if (pageDto.query.firstName)
        _where.firstName = { [Op.substring]: pageDto.query.firstName };
      if (pageDto.query.lastName)
        _where.lastName = { [Op.substring]: pageDto.query.lastName };
      if (pageDto.query.name)
        _where.name = { [Op.substring]: pageDto.query.name };
    }

    const users = await userDao.findAllByPage(
      pageDto.pageSize,
      pageDto.current,
      _where
    );

    const usersCount = await userDao.getCount(_where);
    return new PageResponseDto<UserDto>(
      users,
      pageDto.pageSize,
      pageDto.current,
      usersCount
    );
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
    const roleCodes = userRoles.map((x) => x.roleCode);
    const menus = await menuPermissionDao.getMenuPermissionsByRoleCodes(
      roleCodes
    );
    const menuCodes = menus.map((x) => x.menuCode);
    return menuCodes;
  }

  public async getUser(id: Number): Promise<UserDto> {
    const user = await userDao.findById(id);
    const userRoles = await userRoleDao.getUserRolesByUsername(user.username);
    const roleCodes = userRoles.map((x) => x.roleCode);
    const roles = await roleDao.getRolesByRoleCodes(roleCodes);
    user.roles = roles;
    return user;
  }

  public async deleteUser(id: Number): Promise<boolean> {
    const user = await userDao.findById(id);
    sequelize.transaction(async (t) => {
      await userRoleDao.deleteByUsername(user.username);
      await userDao.deleteById(id);
    });
    return true;
  }

  public async createUser(_userDto: UserDto): Promise<boolean> {
    sequelize.transaction(async (t) => {
      _userDto.password = MD5("123456");
      const userId = await userDao.create(_userDto);
      let userRoleDtos: Array<UserRoleDto> = [];
      const roles = _userDto.roles || [];
      for (let i = 0; i < roles.length; i++) {
        const userRoleDto = new UserRoleDto();
        userRoleDto.roleCode = roles[i].roleCode;
        userRoleDto.username = _userDto.username;
        userRoleDtos.push(userRoleDto);
      }
      await userRoleDao.batchCreate(userRoleDtos);
    });
    return true;
  }

  public async updateUser(_userDto: UserDto): Promise<boolean> {
    const dbUserRolesDto = await userRoleDao.getUserRolesByUsername(
      _userDto.username
    );
    const dbUserRoleCodes = dbUserRolesDto.map((x) => x.roleCode);
    const currentRoles = _userDto.roles || [];
    const currentRoleCodes = currentRoles.map((x) => x.roleCode);
    const insertUserRoleCodes = currentRoleCodes.filter(
      (x) => !dbUserRoleCodes.includes(x)
    );

    let insertUserRoleDtos: Array<UserRoleDto> = [];
    for (let i = 0; i < insertUserRoleCodes.length; i++) {
      const userRoleDto = new UserRoleDto();
      userRoleDto.roleCode = insertUserRoleCodes[i];
      userRoleDto.username = _userDto.username;
      insertUserRoleDtos.push(userRoleDto);
    }

    const deleteUserRoleIds = dbUserRolesDto
      .filter((x) => !currentRoleCodes.includes(x.roleCode))
      .map((x) => x.id || -1);

    sequelize.transaction(async (t) => {
      await userDao.update(_userDto, _userDto.id || -1);
      await userRoleDao.batchCreate(insertUserRoleDtos);
      await userRoleDao.deleteByIds(deleteUserRoleIds);
    });
    return true;
  }
}
