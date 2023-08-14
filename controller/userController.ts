import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import  UserDto  from '../dto/userDto';
import UserService from '../service/impl/userService';

const userService =new UserService();


@Controller('/user')
export default class UserController {
    @Post('/getusers')
    public GetUser(@Body() userDto: UserDto) {
        return  userService.getUsers(userDto);
    } 
}