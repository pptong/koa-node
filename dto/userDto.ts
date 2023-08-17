import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';
import RoleDto from './roleDto';

@Exclude()
export default class UserDto extends BaseDto {

    @Expose()
    public username?: String;

    @Expose()
    public password?: String;

    @Expose()
    public firstName?: String;

    @Expose()
    public lastName?: String;

    public roles?: Array<RoleDto>;

}