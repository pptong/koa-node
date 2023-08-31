import { Expose, Exclude } from 'class-transformer'
import BaseDto from './baseDto';

@Expose()
export  default class PageRequestDto<T extends BaseDto> {
    data!:Array<T>;
    pageSize!: number;
    current!: number;
    total!:number;

    constructor(_data:Array<T>,_pageSize:number,_current:number,_total:number)
    {
        this.data=_data;
        this.pageSize=_pageSize;
        this.current=_current;
        this.total=_total;
    }
}