import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { LoginDto } from '../dto/loginDto';
import jsonwebtoken from 'jsonwebtoken';
import { JwtConfig } from '../config';
import UserService from '../service/impl/userService';
import { IUserService } from '../service/userService';


@Controller('/auth')
export default class AuthController {


    userService: IUserService = new UserService();

    @Post('/login')
    public async GetUser(@Body() loginDto: LoginDto) {



        const verification = await this.userService.verification(loginDto);
        //console.log(JSON.stringify(loginDto));
        if (verification) {
            const token = jsonwebtoken.sign({ name: loginDto.username }, Buffer.from(JwtConfig.jwtSecret), { expiresIn: '3h' })
            return token;
        }
    }
}