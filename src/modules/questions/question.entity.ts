import { Table, ForeignKey, Column, Model, DataType } from 'sequelize-typescript';

import { Set } from '../sets/set.entity';

@Table
export class Question extends Model<Question> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text: string;

    @ForeignKey(() => Set)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    setId: number;
}
