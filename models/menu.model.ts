import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import { Base } from './base.model';
import { Table, Column, Model, HasMany } from 'sequelize-typescript';


@Table
export class Menu extends Base {
  @Column
  menuName!: string;

  @Column
  menuCode!: string;


  @Column
  parentId!: bigint;

  @Column
  path!: string;
}



// const menuModel = {
//   menuName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },

//   menuCode: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },

//   parentId: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },

//   path: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
// }

// const menuFiled = {...menuModel,...baseModel}

// const MenuModel=sequelize.define('Menu',menuFiled,{
//   freezeTableName: true
// })s


// MenuModel.sync()
// console.log('table [menu] is sync')

// export const MenuFiled = menuFiled;
// export default MenuModel