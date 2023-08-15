import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Exclude()
export default class UserDto extends BaseDto {
    
    @Expose()
    public username?: String;

    @Expose()
    public password?: String;
}