import  UserDto from "../dto/userDto";
import { LoginDto } from "../dto/loginDto";  
import PageDto from "../dto/public/pageDto";
export interface IUserService
{
    getUsers(pageDto:PageDto):Promise< Array<UserDto>>;
    getUser(id:Number):Promise< UserDto>;
    verification(_loginDto: LoginDto): Promise<UserDto>;
    createUser(_userDto: UserDto):Promise<boolean>;
    updateUser(_userDto: UserDto): Promise<boolean>;
    deleteUser(id: Number): Promise<boolean>
}