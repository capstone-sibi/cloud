import { Module } from '@nestjs/common';

import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { setsProviders } from './sets.providers';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [QuestionsModule],
  providers: [SetsService, ...setsProviders],
  controllers: [SetsController],
})
export class SetsModule {}
