import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { userDto } from '../dto/userDto';
//import { loginDto } from '../dto/loginDto';

@Controller('/user')
export default class UserController {
    @Post('/getusers')
    public GetUser(@Body() userDto: userDto) {
        return  `My name is ${userDto.userName},my id is ${userDto.userId}`
    } 
}