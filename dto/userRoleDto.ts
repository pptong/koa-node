import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class UserRoleDto extends BaseDto {
    
    @Expose()
    public roleId?: number;

    @Expose()
    public userId?: number;

}