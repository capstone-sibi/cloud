import { IsNotEmpty } from 'class-validator';

export class TtsDto {

    @IsNotEmpty()
    readonly text: string;

}
