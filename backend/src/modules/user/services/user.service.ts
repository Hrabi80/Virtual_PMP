import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from '../dtos/user-register.req.dto';
import { User } from '../entities/user.entity';
import { UserRoles } from '../enums/user.enum';
import { PROFESSOR } from '../entities/professor.entity';

@Injectable()
export class UserService {
  async register(userRegister: UserRegisterRequestDto): Promise<User> {
    // Check if the email is already registered
    const existingEmailProfessor = await PROFESSOR.findOne({
      where: { email: userRegister.email },
    });
    const existingEmailMemeber = await User.findOne({
      where: { email: userRegister.email },
    });
    if (existingEmailProfessor || existingEmailMemeber) {
      throw new BadRequestException('User with this email already exists');
    }
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    return await user.save();
  }

  async registerProfessor(
    userRegister: UserRegisterRequestDto,
  ): Promise<PROFESSOR> {
    // Check if the email is already registered
    const existingEmailProfessor = await PROFESSOR.findOne({
      where: { email: userRegister.email },
    });
    const existingEmailMemeber = await User.findOne({
      where: { email: userRegister.email },
    });
    if (existingEmailProfessor || existingEmailMemeber) {
      throw new BadRequestException('User with this email already exists');
    } else {
      const professor = new PROFESSOR();
      professor.name = userRegister.name;
      professor.email = userRegister.email;
      professor.password = userRegister.password;
      professor.role = UserRoles.PROFESSOR;
      return await professor.save();
    }
  }

  async getUserByEmail(email: string): Promise<User | PROFESSOR | undefined> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return user;
    }
    const professor = await PROFESSOR.findOne({ where: { email } });
    if (professor) {
      return professor;
    }
    return undefined;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  async getProfessorById(id: number): Promise<PROFESSOR | undefined> {
    return PROFESSOR.findOne({ where: { id } });
  }
}
