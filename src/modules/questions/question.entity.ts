import { Table, ForeignKey, Column, Model, DataType } from 'sequelize-typescript';

import { Set } from '../sets/set.entity';

@Table
export class Question extends Model<Question> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text: string;

    // create foreign key to set
    @ForeignKey(() => Set)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    setId: number;
}
