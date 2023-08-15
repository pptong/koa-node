import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import baseModel from './baseModels';


const menuModel = {
  menuName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  menuCode: {
    type: DataTypes.STRING,
    allowNull: false
  },

  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
}

const menuFiled = {...menuModel,...baseModel}

const MenuModel=sequelize.define('Menu',menuFiled,{
  freezeTableName: true
})


MenuModel.sync()
console.log('table [menu] is sync')

export const MenuFiled = menuFiled;
export default MenuModel