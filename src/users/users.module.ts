import { Module } from '@nestjs/common';
import { UsersController } from './interfaces/users.controller';
import { PrismaModule } from 'src/users/infra/prisma/prisma.module';
import { CreateUserUseCase } from './aplication/useCase/createUser.useCase';
import { FindUserByEmailOrCpfUseCase } from './aplication/useCase/findUserByEmailOrCpf.useCase';
import { ExistUserUseCase } from './aplication/useCase/existUser.useCase';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [CreateUserUseCase, FindUserByEmailOrCpfUseCase, ExistUserUseCase],
})
export class UsersModule {}
