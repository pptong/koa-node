import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import baseModel from './baseModels';


const userRoleModel = {
  roleId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  UserId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
}


const userRoleField = {...userRoleModel,...baseModel}
const UserRoleModel=sequelize.define('UserRole',userRoleField,{
  freezeTableName: true
})


UserRoleModel.sync()
console.log('table [UserRole] is sync')
export const UserRoleField=userRoleField
export default UserRoleModel