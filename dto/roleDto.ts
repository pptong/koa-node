import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class RoleDto extends BaseDto {
    
    @Expose()
    public roleName?: String;

    @Expose()
    public roleDescption?: String;

}