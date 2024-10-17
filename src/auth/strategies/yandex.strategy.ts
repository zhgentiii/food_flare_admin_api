import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { AuthProviders } from 'src/db/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: 'b6658615388a41cba7328b50d5ea5cb7',
      clientSecret: '9bf078461ca4414dbf2202e7c817315a',
      callbackURL: 'https://59fa-95-25-172-2.ngrok-free.app/auth/callback',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const { id: providerId } = profile._json;

    const provider = AuthProviders.YANDEX;

    const user = await this.authService.authWithProviderId(providerId);

    const jwtData = { provider, providerId, _id: user._id, roles: user.roles };

    const jwt = await this.jwtService.signAsync(jwtData);

    done(null, jwt);
  }
}
