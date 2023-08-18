import { Expose, Exclude } from 'class-transformer'


export  default class PageDto {
    @Expose()
    query!: { [x: string]: string };

    @Expose()
    pageSize!: number;

    @Expose()
    pageIndex!: number;
}