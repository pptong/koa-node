import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { LoginDto } from '../dto/loginDto';
import jsonwebtoken from 'jsonwebtoken';
import { JwtConfig } from '../config';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService';
import { ErrorCode } from '../error/errorCode';


@Controller('/auth')
export default class AuthController {

    userService: IUserService = new UserService();
    
    @Post('/login')
    public async GetUser(@Body() loginDto: LoginDto) {
        const user = await this.userService.verification(loginDto);
        if (!user) {
            throw new Error(ErrorCode.AuthFailed.code)
        }
        //console.log(user)
        const token = jsonwebtoken.sign({user}, Buffer.from(JwtConfig.jwtSecret), { expiresIn: '3h' })
        return token;
    }
}