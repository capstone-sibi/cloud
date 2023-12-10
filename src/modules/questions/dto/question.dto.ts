import { IsNotEmpty } from 'class-validator';

export class QuestionDto {

    @IsNotEmpty()
    readonly text: string;

}
