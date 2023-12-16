import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class SetDto {

    @ApiProperty({
        example: 'Set 1',
        required: false
     })
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

}
