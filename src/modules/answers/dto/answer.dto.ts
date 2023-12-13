import { IsNotEmpty } from 'class-validator';

export class AnswerDto {

    @IsNotEmpty()
    readonly isCorrect: boolean;

    @IsNotEmpty()
    readonly text: string;
    
}
