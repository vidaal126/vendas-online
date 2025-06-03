import { Module } from '@nestjs/common';
import { TransationService } from './transation.service';
import { TransationController } from './transation.controller';

@Module({
  controllers: [TransationController],
  providers: [TransationService],
})
export class TransationModule {}
