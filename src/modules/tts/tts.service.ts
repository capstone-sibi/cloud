import { Storage } from '@google-cloud/storage';
import textToSpeech from '@google-cloud/text-to-speech';
import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import * as fs from 'fs';
import { TtsDto } from './dto/tts.dto';

@Injectable()
export class TtsService {
    private storage: Storage;
    private bucketName = process.env.BUCKET_NAME;
    private audioFolder = 'audio';
    private localPath = `${__dirname}/../../../assets/${this.audioFolder}`;

    constructor() { 
        this.storage = new Storage();
    }

    async getAudioTts(tts : TtsDto) {
        try {
            const baseName = tts.text.toLowerCase();
            const fileName = `${baseName}.mp3`;
            const localFile = `${this.localPath}/${baseName}`
            const fileExists = await this.checkFileExists(fileName);
            console.log(fileName)
            console.log(fileExists)
            if (fileExists) {
                return `https://storage.googleapis.com/${this.bucketName}/audio/${encodeURIComponent(fileName)}`;
            }

            const client = new textToSpeech.TextToSpeechClient({
                keyFilename: process.env.TTS_CREDENTIALS,
            });
            const request = {
                input: { text: tts.text },
                voice: { languageCode: 'id-ID', name: 'id-ID-Wavenet-A' },
                audioConfig: { audioEncoding: "MP3" as const },
            };
    
            const [response] = await client.synthesizeSpeech(request);
            console.log(localFile)
            fs.writeFileSync(localFile, response.audioContent, 'binary');

            await this.uploadToStorage(fileName, localFile);

            return `https://storage.googleapis.com/${this.bucketName}/audio/${encodeURIComponent(fileName)}`;
        } catch (error) {
            throw new HttpException(`Could not get audio file`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async checkFileExists(fileName: string): Promise<boolean> {
        try {
            const filePath = `${this.audioFolder}/${fileName}`;
            console.log(filePath)
            const [exists] = await this.storage.bucket(this.bucketName).file(filePath).exists();
            console.log(exists[0])
            return exists;
        } catch (error) {
            throw new HttpException(`Could not check file ${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async uploadToStorage(fileName: string, localFile: string): Promise<void> {
        try {
            const filePath = `${this.audioFolder}/${fileName}`;
            const fileContent = fs.readFileSync(localFile);
            const file = this.storage.bucket(this.bucketName).file(filePath);
            await file.save(fileContent, {
                metadata: { contentType: 'audio/mpeg' },
            });
        } catch (error) {
            throw new HttpException(`Could not upload file ${fileName}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
