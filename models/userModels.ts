import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import baseModel from './baseModels';


//class UserModel extends Model {}

const userModel = {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName:{
    type: DataTypes.STRING,
  },
}

// UserModel.init( {...baseModel,...userModel}, {
//   sequelize, 
//   modelName: 'User' 
// });

const userField = {...userModel,...baseModel}
const UserModel=sequelize.define('User',userField,{
  freezeTableName: true
})


UserModel.sync()
console.log('table [user] is sync')
export const UserField=userField 
export default UserModel