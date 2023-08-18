import { Expose, Exclude,Type } from 'class-transformer'
import BaseDto from './public/baseDto';
import RoleDto from './roleDto';

@Exclude()
export default class UserDto extends BaseDto {



    @Expose()
    public username!: string;

    @Expose()
    public password?: string;

    @Expose()
    public firstName?: string;

    @Expose()
    public lastName?: string;


    @Expose()
    public roles?: RoleDto[];

}