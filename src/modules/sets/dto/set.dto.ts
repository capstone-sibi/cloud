import { IsNotEmpty, MinLength } from 'class-validator';

export class SetDto {

    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

}
