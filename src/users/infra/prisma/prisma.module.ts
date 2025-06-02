import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaRepository } from './prisma.repository';

@Module({
  providers: [PrismaService, PrismaRepository],
  exports: [PrismaService, PrismaRepository],
})
export class PrismaModule {}
