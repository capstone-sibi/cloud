import { IsNotEmpty } from 'class-validator';

export class AnswerDto {

    @IsNotEmpty()
    readonly is_correct: boolean;

    @IsNotEmpty()
    readonly text: string;
    
}
