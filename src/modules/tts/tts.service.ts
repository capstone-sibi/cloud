import { Injectable } from '@nestjs/common';
import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';
import { TtsDto } from './dto/tts.dto';

@Injectable()
export class TtsService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    async getAudioTts(tts : TtsDto) {
        // check if in cloud storage already exist
        const client = new textToSpeech.TextToSpeechClient();
        const request = {
            input: { text: tts.text },
            voice: { languageCode: 'id-ID', name: 'id-ID-Wavenet-A' },
            audioConfig: { audioEncoding: "MP3" as const },
        };

        const [response] = await client.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        const outputFile = `linktocloudstorage/${tts.text}.mp3`;
        await writeFile(outputFile, response.audioContent, 'binary');
        // store into bucket
        // return link
        return outputFile;
    }
}
