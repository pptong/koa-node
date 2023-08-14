import  UserDto from "../dto/userDto";
import { LoginDto } from "../dto/loginDto";  
export interface IUserService
{
    getUsers(userDto:UserDto):Promise< Array<UserDto>>;
    verification(_loginDto: LoginDto): Promise<boolean>;
}