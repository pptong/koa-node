import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { loginDto } from '../dto/loginDto';
import jsonwebtoken from 'jsonwebtoken';
import { JwtConfig } from '../config';

@Controller('/auth')
export default  class AuthController {
    @Post('/login')
    public GetUser(@Body() loginDto: loginDto) {
        const token = jsonwebtoken.sign({ name: loginDto.userName }, Buffer.from(JwtConfig.jwtSecret), { expiresIn: '3h' })
        return token;
    } 
}