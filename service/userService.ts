import  UserDto from "../dto/userDto";
import { LoginDto } from "../dto/loginDto";  
export interface IUserService
{
    getUsers(userDto:UserDto):Promise< Array<UserDto>>;
    getUser(id:Number):Promise< UserDto>;
    verification(_loginDto: LoginDto): Promise<UserDto>;
    createUser(_userDto: UserDto):Promise<boolean>;
    updateUser(_userDto: UserDto): Promise<boolean>;
}