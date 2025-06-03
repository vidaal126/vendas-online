import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTransation();
}
