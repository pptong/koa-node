import  UserDto from "../dto/userDto";

export interface IUserService
{
    getUsers(userDto:UserDto):Promise< Array<UserDto>>
}