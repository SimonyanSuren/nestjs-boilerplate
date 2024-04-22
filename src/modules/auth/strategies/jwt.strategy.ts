import { type IJwtPayload } from '@common/@types/interfaces/jwt-payload.interface';
import { Codes, STRATEGY_JWT_AUTH } from '@common/constants';
import { ApiConfigService } from '@lib/config/api-config.service';
import { type UserDto } from '@modules/user/dtos/user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, STRATEGY_JWT_AUTH) {
  constructor(
    protected readonly apiConfigService: ApiConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: apiConfigService.authConfig.verifyOptions?.algorithms,
      secretOrKey: apiConfigService.authConfig.privateKey,
      iss: apiConfigService.appUrl,
      ignoreExpiration: false,
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: IJwtPayload): Promise<UserDto> {
    const user = await this.authService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(Codes.UNAUTHORIZED_ERROR);
    }

    return user;
  }
}
