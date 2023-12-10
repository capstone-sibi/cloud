import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Question } from '../questions/question.entity';

@Table
export class Set extends Model<Set> {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    title: string;

    @HasMany(() => Question)
    answers: Question[];
}
