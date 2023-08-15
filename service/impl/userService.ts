import UserDto from "../../dto/userDto";
import { LoginDto } from "../../dto/loginDto";
import { IUserService } from "../userService";
import UserDao from "../../dao/userDao";

const userDao = new UserDao();

export default class UserService implements IUserService {
    public async getUsers(userDto: UserDto): Promise<UserDto[]> {
        //const users = await userDao.getUsers({});
        const users = await userDao.findAll(UserDto);
        //const userDtos  = plainToInstance(UserDto,users);
        return users;
    }


    public async verification(_loginDto: LoginDto): Promise<boolean> {
        const userDto = new UserDto();
        userDto.password = _loginDto.password;
        userDto.username = _loginDto.username;
        const user = await userDao.findUser(userDto);
        console.log(user)
        return user != undefined;
    }

    public async getUser(_userDto: UserDto): Promise<UserDto> {
        const user = await userDao.findOne(_userDto,UserDto);
        //const userDtos = plainToInstance(UserDto, users);
        return user;
    }
}



