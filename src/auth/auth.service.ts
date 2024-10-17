import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authWithProviderId(providerId: string) {
    const user = await this.userService.findUserByProviderId(providerId);

    if (
      user &&
      !['ADMIN', 'RESTAURANT_OWNER'].some((role) =>
        user.roles.includes(role as any),
      )
    ) {
      throw new ForbiddenException('No access permissions');
    }

    return user;
  }
}
