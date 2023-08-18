import UserDto from "../dto/userDto";
import { User } from "../models/user.model";
//import { UserField } from "../models/userModels";
import { plainToInstance } from 'class-transformer';
import BaseDto from "./baseDao";
import { Model,Op } from "sequelize";


export default class UserDao extends BaseDto<Model, UserDto> {

    constructor() {
        super(User,UserDto);
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


    public async getUsersByUsernames(_usernames: Array<string>): Promise<Array<UserDto>> {
        const users = await User.findAll({
            where: {
                username: {
                    [Op.or]: _usernames
                },
            }, raw: true
        });
        const user = plainToInstance(UserDto, users);
        return user;
    }
}

