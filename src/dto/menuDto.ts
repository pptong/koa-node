import { Expose, Exclude } from 'class-transformer'
import BaseDto from './public/baseDto';

@Exclude()
export default class MenuDto extends BaseDto {
    
    @Expose()
    public menuName?: string;

    @Expose()
    public menuCode?: string;

    @Expose()
    public parentId?:Number;
    
    @Expose()
    public path?:string;

    @Expose()
    public code?:string;

    @Expose()
    component?: string;
  
    @Expose()
    redirect?: string;

    @Expose()
    children?: MenuDto[];

}