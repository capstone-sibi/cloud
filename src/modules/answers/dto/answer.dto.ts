import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AnswerDto {
    @ApiProperty({
        example: false,
        required: true
     })
    @IsNotEmpty()
    readonly isCorrect: boolean;

    @ApiProperty({
        example: 'hai, apa kabar?',
        required: true
     })
    @IsNotEmpty()
    readonly text: string;
    
}
