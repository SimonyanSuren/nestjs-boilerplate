import { Codes, STRATEGY_LOCAL } from '@common/constants';
import { type UserDto } from '@modules/user/dtos/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isEmail } from 'class-validator';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<UserDto> {
    if (!isEmail(email)) {
      throw new UnauthorizedException(Codes.WRONG_EMAIL_OR_PASSWORD_ERROR);
    }

    return this.authService.validateUser({ email, password });
  }
}
