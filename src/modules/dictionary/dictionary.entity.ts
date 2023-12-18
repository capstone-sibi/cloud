import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table
export class Dictionary extends Model<Dictionary> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    path: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    meaning: string;
}
