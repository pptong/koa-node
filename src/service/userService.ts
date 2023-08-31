import UserDto from "../dto/userDto";
import { LoginDto } from "../dto/loginDto";
import PageDto from "../dto/public/pageRequestDto";
import PageResponseDto from "../dto/public/pageResponseDto";
export interface IUserService {
    getUsers(pageDto: PageDto): Promise<PageResponseDto<UserDto>>;
    getUser(id: Number): Promise<UserDto>;
    verification(_loginDto: LoginDto): Promise<UserDto>;
    createUser(_userDto: UserDto): Promise<boolean>;
    updateUser(_userDto: UserDto): Promise<boolean>;
    deleteUser(id: Number): Promise<boolean>;
    getMenuCodesByUsername(username: string): Promise<string[]>

}