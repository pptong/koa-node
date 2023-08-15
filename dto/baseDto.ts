import { Expose, Exclude } from 'class-transformer'
import { ClassConstructor } from 'class-transformer'

export default class BaseDto  {
    @Expose()
    public id?: Number;

    @Expose()
    public createBy?:Number

    @Expose()
    public updateBy?:Number

    @Expose()
    public createdAt?:Date

    @Expose()
    public updatedAt?:Date
}