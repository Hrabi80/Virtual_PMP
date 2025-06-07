import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoles } from '../../user/enums/user.enum';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ManagerRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); //get the user context

    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getProfessorById(id); //get User object byId
      return user.role === UserRoles.PROFESSOR; //check if the user role is Professor
    }

    return false;
  }
}
