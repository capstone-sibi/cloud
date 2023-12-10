import { Module } from '@nestjs/common';

import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { answersProviders } from './answers.providers';

@Module({
  providers: [AnswersService, ...answersProviders],
  controllers: [AnswersController],
})
export class AnswersModule {}
