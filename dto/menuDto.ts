import { Expose, Exclude } from 'class-transformer'
import BaseDto from './public/baseDto';

@Exclude()
export default class MenuDto extends BaseDto {
    
    @Expose()
    public menuName?: String;

    @Expose()
    public menuCode?: String;

    @Expose()
    public parentId?:Number;
    
    @Expose()
    public path?:String;

    @Expose()
    public code?:String;

}