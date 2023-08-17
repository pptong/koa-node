import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './baseModels';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';




@Table
export class Role extends Base {
  @Column
  roleName!: string;

  @Column
  roleDescption!: string;

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