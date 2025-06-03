import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TransationModule } from './transation/transation.module';

@Module({
  imports: [UsersModule, TransationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
