import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../aplication/useCase/createUser.useCase';
import { FindUserByEmailOrCpfUseCase } from '../aplication/useCase/findUserByEmailOrCpf.useCase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUserByEmailOrCpfUseCase: FindUserByEmailOrCpfUseCase,
  ) {}
  @Post('createUser')
  async createUserController(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  @Get('findUserCpfOrEmail')
  async findUserByEmailOrCpfController(
    @Body() data: { email: string; cpf: string },
  ) {
    const { email, cpf } = data;
    return this.findUserByEmailOrCpfUseCase.execute(email, cpf);
  }
}
