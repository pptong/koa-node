import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class menuPermissionDto extends BaseDto {
    
    @Expose()
    public menuId?: Number;

    @Expose()
    public roleId?: Number;

}