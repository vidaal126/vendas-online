import { Injectable } from '@nestjs/common';
import { PrismaRepository } from 'src/users/infra/prisma/prisma.repository';

@Injectable()
export class ExistUserUseCase {
  constructor(private readonly prismaRepository: PrismaRepository) {}
  async execute(email: string, cpf: string) {
    return this.prismaRepository.existUser(email, cpf);
  }
}
