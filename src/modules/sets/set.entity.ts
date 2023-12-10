import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Set extends Model<Set> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

}
