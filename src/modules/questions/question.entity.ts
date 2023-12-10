import { Table, ForeignKey, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { Set } from '../sets/set.entity';
import { Answer } from '../answers/answer.entity';

@Table
export class Question extends Model<Question> {
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    text: string;

    @ForeignKey(() => Set)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    setId: number;

    @HasMany(() => Answer)
    answers: Answer[];
}
