import { Module } from '@nestjs/common';

import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { dictionaryProviders } from './dictionary.providers';

@Module({
  providers: [DictionaryService, ...dictionaryProviders],
  controllers: [DictionaryController],
  exports: [DictionaryService],
})
export class DictionaryModule {}
