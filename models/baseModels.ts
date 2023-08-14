import { Sequelize, DataTypes, Model } from 'sequelize';

const baseModel = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    createBy: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    updateBy: {
        type: DataTypes.BIGINT,
    }
}

export default baseModel