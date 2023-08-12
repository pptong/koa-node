import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { userDto } from '../dto/userDto';

@Controller()
export  class UserController {
    @Post('/getUsers')
    public GetUser(@Body() userDto: userDto) {
        return  `My name is ${userDto.userName},my id is ${userDto.userId}`
    } 
}