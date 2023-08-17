import UserDto from "../dto/userDto";
import {User} from "../models/userModels";
//import { UserField } from "../models/userModels";
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model } from "sequelize";


export default class UserDao extends BaseDto<Model, UserDto> {

    constructor() {
        super(User);
    }

    public async getUsers(_userDto: UserDto): Promise<UserDto[]> {
        const users = await User.findAll({ raw: true });
        const userDtos = plainToInstance(UserDto, users);
        return userDtos;
    }

    public async findUser(_userDto: UserDto): Promise<UserDto> {
        const users = await User.findOne({
            where: {
                username: _userDto.username,
                password: _userDto.password
            }, raw: true
        });
        const user = plainToInstance(UserDto, users);
        return user;
    }
}

