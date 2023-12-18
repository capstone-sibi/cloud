import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DictionaryDTO {
    @ApiProperty({
        example: "http://google.com/",
        required: true
     })
    @IsNotEmpty()
    readonly path: string;

    @ApiProperty({
        example: 'Membaca',
        required: true
     })
    @IsNotEmpty()
    readonly meaning: string;
    
}
