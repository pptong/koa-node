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
