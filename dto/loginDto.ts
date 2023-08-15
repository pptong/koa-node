import { Expose } from 'class-transformer';

export type LoginDto  = {
    username: string;
    password: string;
}