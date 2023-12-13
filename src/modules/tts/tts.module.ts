import { Module } from '@nestjs/common';

import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [QuestionsModule],
  providers: [TtsService],
  controllers: [TtsController],
})
export class SetsModule {}
