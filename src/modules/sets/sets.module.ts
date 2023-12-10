import { Module } from '@nestjs/common';

import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { setsProviders } from './sets.providers';

@Module({
  providers: [SetsService, ...setsProviders],
  controllers: [SetsController],
})
export class SetsModule {}
