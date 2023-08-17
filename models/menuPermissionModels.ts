import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './baseModels';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';



@Table
export class MenuPermission extends Base {
  @Column
  menuId!: bigint;

  @Column
  roleId!: bigint;

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