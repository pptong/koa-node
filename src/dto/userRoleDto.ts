import { Expose, Exclude } from 'class-transformer'
import BaseDto from './public/baseDto';

@Exclude()
export default class UserRoleDto extends BaseDto {
    
    @Expose()
    public roleCode!: string;

    @Expose()
    public username!: string;

}