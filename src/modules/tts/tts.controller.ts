import { Controller, Post, Body, Request } from '@nestjs/common';
import { ResponseMessage } from '../../decorators/response.decorator';
import { TtsService } from './tts.service';
import { TtsDto } from './dto/tts.dto';

@Controller('tts')
export class TtsController {
    constructor(
        private readonly ttsService: TtsService,
    ) { }

    @Post()
    @ResponseMessage('Successfully created set')
    async create(@Body() tts: TtsDto, @Request() req) {
        return await this.ttsService.getAudioTts(tts);
    }

}
