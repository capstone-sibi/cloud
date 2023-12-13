import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';

import { TtsDto } from './dto/tts.dto';

@Injectable()
export class TtsService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    async getAudioTts(tts : TtsDto) {
        // tembak google tts api
        return
    }
}
