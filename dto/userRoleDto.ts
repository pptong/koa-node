import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class UserRoleDto extends BaseDto {
    
    @Expose()
    public roleId?: Number;

    @Expose()
    public userId?: Number;

}