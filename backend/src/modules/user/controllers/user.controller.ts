import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRegisterRequestDto } from '../dtos/user-register.req.dto';
import { SETTINGS } from 'src/utils/app.utils';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async registration(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto,
  ) {
    return await this.userService.register(userRegister);
  }

  @Post('/register-professor')
  @ApiCreatedResponse({
    description: 'Created User object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async registerProfessor(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDto,
  ) {
    return await this.userService.registerProfessor(userRegister);
  }
}
