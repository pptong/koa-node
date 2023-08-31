import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';

//class UserModel extends Model {}


@Table
export class User extends Base {
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  name?:string;
  
  @Column
  avatar?:string;

}
