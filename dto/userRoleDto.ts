import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class UserRoleDto extends BaseDto {
    
    @Expose()
    public roleCode!: string;

    @Expose()
    public usernmae!: string;

}