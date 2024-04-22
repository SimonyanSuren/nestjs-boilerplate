import { type IJwtPayload } from '@common/@types';
import { Codes } from '@common/constants';
import { HelperService } from '@common/helpers';
import { ApiConfigService } from '@lib/config/api-config.service';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UserRepository } from '@modules/user/user.repository';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transactional } from 'typeorm-transactional';

import { type Nullable } from '../../common/@types/types/common.types';
import { type SignUpDto } from './dto/sign-up.dto';
import { type SignInDto } from './dto/sing-in.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  @Transactional()
  public async signup(dto: SignUpDto): Promise<UserDto> {
    const { email, password } = dto;
    const existing = await this.usersRepository.findByEmail(email);

    if (existing) {
      throw new BadRequestException(Codes.ALREADY_REGISTERED_ERROR);
    }

    const userDto = UserDto.create({
      email,
      password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      roleId: dto.roleId,
      dob: dto.dob,
      phoneNumber: dto.phoneNumber,
      isEmailVerified: false,
      isActive: true,
    });

    return this.usersRepository.create(userDto);
  }

  public async validateUser(dto: SignInDto): Promise<UserDto> {
    const { email, password } = dto;
    const user = await this.usersRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new NotFoundException(Codes.WRONG_EMAIL_OR_PASSWORD_ERROR);
    }

    const isEqual = await HelperService.comparePasswords(password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException(Codes.WRONG_EMAIL_OR_PASSWORD_ERROR);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    const { password: _, ...userWithOutPassword } = user;

    return userWithOutPassword as UserDto;
  }

  public async signin(user: UserDto): Promise<UserDto> {
    this.logger.verbose('User signed in');
    const payload: IJwtPayload = {
      sub: user.id,
      role: user.roleId,
      iss: this.configService.appUrl,
    };

    const token = await this.jwtService.signAsync(payload);

    user.token = token;

    return user;
  }

  public async findUserById(id: UserDto['id']): Promise<Nullable<UserDto>> {
    return this.usersRepository.findById(id);
  }
}
