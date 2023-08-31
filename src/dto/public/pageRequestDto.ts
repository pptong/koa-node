import { Expose, Exclude } from 'class-transformer'


export  default class PageRequestDto {
    @Expose()
    query!: { [x: string]: string };

    @Expose()
    pageSize!: number;

    @Expose()
    current!: number;
}