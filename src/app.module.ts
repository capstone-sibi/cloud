import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AnswersModule } from './modules/answers/answers.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SetsModule } from './modules/sets/sets.module';
import { TtsModule } from './modules/tts/tts.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    QuestionsModule,
    SetsModule,
    AnswersModule,
    TtsModule,
    DictionaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
