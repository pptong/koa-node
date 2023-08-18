import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';



@Table
export class MenuPermission extends Base {
  @Column
  menuCode!: string;

  @Column
  roleCode!: string;

} 
