import { Expose, Exclude,Type } from 'class-transformer'
import BaseDto from './public/baseDto';
import { User } from '../models/user.model';
import UserDto from './userDto';
import MenuDto from './menuDto';

@Exclude()
export default class RoleDto extends BaseDto {
    
    @Expose()
    public roleName!: string;

    @Expose()
    public roleCode!: string;

    @Expose()
    public roleDescrption?: string;

    @Expose()

    public users?: UserDto[];

    @Expose()

    public menus?:MenuDto[];
}