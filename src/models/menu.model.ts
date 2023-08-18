import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';


@Table
export class Menu extends Base {
  @Column
  menuName!: string;

  @Column
  menuCode!: string;


  @Column
  parentId!: bigint;

  @Column
  path!: string;


  
}
