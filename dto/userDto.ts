import { Expose,Exclude } from 'class-transformer'

@Exclude()
export default class UserDto {
    @Expose()
    public id?: number;

    @Expose()
    public username?: String;

    @Expose()
    public password?: String;
}