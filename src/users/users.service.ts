import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.prisma.users.findFirst({
        where: {
          OR: [{ email: createUserDto.email }, { cpf: createUserDto.cpf }],
        },
      });

      if (existUser) {
        return {
          message:
            existUser.email === createUserDto.email
              ? 'E-mail já existe'
              : 'CPF já existe',
          statusCode: HttpStatus.CONFLICT,
          success: false,
        };
      }

      const hashPassword = await hash(createUserDto.password, 10);

      const createNewUser = await this.prisma.users.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          phone: createUserDto.phone,
          cpf: createUserDto.cpf,
          password: hashPassword,
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
