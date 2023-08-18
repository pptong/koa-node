import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';


@Table
export class UserRole extends Base {
  @Column
  roleCode!: string;

  @Column
  username!: string;

}

// const userRoleModel = {
//   roleId: {
//     type: DataTypes.BIGINT,
//     allowNull: false
//   },
//   UserId: {
//     type: DataTypes.BIGINT,
//     allowNull: false
//   },
// }


// const userRoleField = {...userRoleModel,...baseModel}
// const UserRoleModel=sequelize.define('UserRole',userRoleField,{
//   freezeTableName: true
// })


// UserRoleModel.sync()
// console.log('table [UserRole] is sync')
// export const UserRoleField=userRoleField
// export default UserRoleModel