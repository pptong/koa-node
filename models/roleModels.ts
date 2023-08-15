import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequlize/sequlize';
import baseModel from './baseModels';


const roleModel = {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleDescption: {
        type: DataTypes.STRING,
        allowNull: false
    },
}


const roleFiled = { ...roleModel, ...baseModel }
const RoleModel = sequelize.define('Role', roleFiled, {
    freezeTableName: true
})


RoleModel.sync()
console.log('table [role] is sync')
export const RoleField = roleFiled
export default RoleModel