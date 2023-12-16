import { ApiProperty } from "@nestjs/swagger";

export class QuestionDto {

    @ApiProperty({
        example: 'Apakah arti dari gesture di bawah?',
        required: true
    })
    readonly text: string;

    @ApiProperty({
        example: 'hai, apa kabar?',
        required: true
    })
    readonly filename: string;
}
