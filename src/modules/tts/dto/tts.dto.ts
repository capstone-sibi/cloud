import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TtsDto {

    @ApiProperty({
        example: 'hai, apa kabar?',
        required: true
    })
    @IsNotEmpty()
    readonly text: string;

}
