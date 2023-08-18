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

// const menusPermissionModel = {
//   menuId: {
//     type: DataTypes.BIGINT,
//     allowNull: false
//   },
//   roleId: {
//     type: DataTypes.BIGINT,
//     allowNull: false
//   },
// }


// const menusPermissionField = { ...menusPermissionModel, ...baseModel }
// const MenuPermissionModel = sequelize.define('MenuPermission', menusPermissionField, {
//   freezeTableName: true
// })


// MenuPermissionModel.sync()
// console.log('table [menuPermission] is sync')
// export const MenusPermissionField = menusPermissionField
// export default MenuPermissionModel