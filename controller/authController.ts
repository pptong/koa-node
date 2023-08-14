import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { LoginDto } from '../dto/loginDto';
import jsonwebtoken from 'jsonwebtoken';
import { JwtConfig } from '../config';
import UserService from '../service/impl/userService';

const userService =new UserService();

@Controller('/auth')
export default  class  AuthController {
    @Post('/login')
    public async GetUser(@Body() loginDto: LoginDto) {
        

        const verification = await userService.verification(loginDto);
        //console.log(JSON.stringify(loginDto));
        if(verification){
            const token = jsonwebtoken.sign({ name: loginDto.username }, Buffer.from(JwtConfig.jwtSecret), { expiresIn: '3h' })
            return token;
        }
    } 
}