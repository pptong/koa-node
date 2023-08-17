import { Expose, Exclude } from 'class-transformer'
import { ClassConstructor } from 'class-transformer'

export default class BaseDto  {
    @Expose()
    public id?: Number;

    @Expose()
    public createBy?:string

    @Expose()
    public updateBy?:string

    @Expose()
    public createdAt?:Date

    @Expose()
    public updatedAt?:Date
}