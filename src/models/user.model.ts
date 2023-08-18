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

}


// const userModel = {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   firstName:{
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName:{
//     type: DataTypes.STRING,
//   },
// }

// UserModel.init( {...baseModel,...userModel}, {
//   sequelize, 
//   modelName: 'User' 
// });

// const userField = { ...userModel, ...baseModel }
// const UserModel = sequelize.define('User', userField, {
//   freezeTableName: true
// })


// UserModel.sync()
// console.log('table [user] is sync')
// export const UserField = userField
// export default UserModel