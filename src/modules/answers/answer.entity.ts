import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Question } from '../questions/question.entity';

@Table
export class Answer extends Model<Answer> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    is_correct: boolean;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    questionId: number;

    @BelongsTo(() => Question)
    question: Question;
}
