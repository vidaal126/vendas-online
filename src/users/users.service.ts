import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { hashPassword } from 'src/utils/bycript';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const passwordHashed = await hashPassword(createUserDto.password);

    return {
      ...createUserDto,
      password: passwordHashed,
      id: 1,
    };
  }
}
