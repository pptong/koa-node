import { Expose, Exclude } from 'class-transformer'
import { ClassConstructor } from 'class-transformer'

export default class BaseDto  {
    @Expose()
    public id?: number;
}