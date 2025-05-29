import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.prisma.users.findUnique({
        where: { email: createUserDto.email },
      });

      if (existUser) {
        return {
          message: 'Usuário já existe',
          statusCode: HttpStatus.CONFLICT,
          success: false,
        };
      }

      const createNewUser = await this.prisma.users.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          phone: createUserDto.phone,
          cpf: createUserDto.cpf,
          password: createUserDto.password,
        },
        omit: { password: true },
      });
      return createNewUser;
    } catch (error) {
      return {
        message: `Caiu no catch ${error}`,
        statusCode: HttpStatus.BAD_GATEWAY,
        success: false,
      };
    }
  }
}
