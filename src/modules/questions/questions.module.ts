import { Module } from '@nestjs/common';

import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionsProviders } from './questions.providers';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [AnswersModule],
  providers: [QuestionsService, ...questionsProviders],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
