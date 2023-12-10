import { Module } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';

@Module({
  providers: [QuestionsService, ...questionsProviders],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
