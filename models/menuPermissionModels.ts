import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import baseModel from './baseModels';


const menusPermissionModel = {
  menuId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  roleId: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
}



const MenuPermissionModel=sequelize.define('MenuPermission',{...menusPermissionModel,...baseModel},{
  freezeTableName: true
})


MenuPermissionModel.sync()
console.log('table [menuPermission] is sync')

export default MenuPermissionModel