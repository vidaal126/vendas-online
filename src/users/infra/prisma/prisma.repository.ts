import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from './prisma.service';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmailOrCpf(email: string, cpf: string) {
    try {
      return this.prisma.users.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });
    } catch (error) {
      return {
        message: `Erro ao criar usuário ${error}`,
        statusCode: HttpStatus.BAD_GATEWAY,
        success: false,
      };
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const createNewUser = await this.prisma.users.create({
        data: createUserDto,
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

  async existUser(email: string, cpf: string) {
    try {
      const validateUser = await this.prisma.users.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });

      if (validateUser) {
        return {
          message:
            validateUser.email === email
              ? 'já existe um usuário com esse email'
              : 'já existe um usuário com esse CPF',
          statusCode: HttpStatus.CONFLICT,
          success: false,
        };
      }
    } catch (error) {
      return {
        message: `Erro ao criar usuário ${error}`,
        statusCode: HttpStatus.BAD_GATEWAY,
        success: false,
      };
    }
  }
}
