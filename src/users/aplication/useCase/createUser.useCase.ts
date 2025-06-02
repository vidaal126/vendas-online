import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaRepository } from 'src/users/infra/prisma/prisma.repository';
import { hashPassword } from 'src/utils/bycript';
import { ExistUserUseCase } from './existUser.useCase';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly prismaRepository: PrismaRepository,
    private readonly existUserUseCase: ExistUserUseCase,
  ) {}
  async execute(createUserDto: CreateUserDto) {
    await this.existUserUseCase.execute(createUserDto.email, createUserDto.cpf);

    const hashedPassword = await hashPassword(createUserDto.password);
    const newUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      cpf: createUserDto.cpf,
      password: hashedPassword,
    };
    return this.prismaRepository.createUser(newUser);
  }
}
