import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';




@Table
export class Role extends Base {
  @Column
  roleName!: string;

  @Column
  roleDescrption!: string;

  @Column
  roleCode!: string;

 }

// const roleModel = {
//     roleName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     roleDescption: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
// }


// const roleFiled = { ...roleModel, ...baseModel }
// const RoleModel = sequelize.define('Role', roleFiled, {
//     freezeTableName: true
// })


// RoleModel.sync()
// console.log('table [role] is sync')
// export const RoleField = roleFiled
// export default RoleModel