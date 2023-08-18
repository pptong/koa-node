import { Expose, Exclude } from 'class-transformer'
import BaseDto from './public/baseDto';

@Exclude()
export default class MenuPermissionDto extends BaseDto {
    
    @Expose()
    public menuCode!: string;

    @Expose()
    public roleCode!: string;

    

}