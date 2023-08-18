import { Sequelize, DataTypes } from 'sequelize';
import { Table, Column, CreatedAt,UpdatedAt,Model, HasMany } from 'sequelize-typescript';


@Table
export class Base extends Model {

    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;

    @Column
    public createdBy!:string

    @Column
    public updatedBy!:string
}



// const baseModel = {
//     // id: {
//     //     type: DataTypes.BIGINT,
//     //     primaryKey: true,
//     //     autoIncrement: true,
//     //     allowNull: false
//     // },
//     createBy: {
//         type: DataTypes.BIGINT,
//         allowNull: false
//     },
//     updateBy: {
//         type: DataTypes.BIGINT,
//     }
// }

// export default baseModel