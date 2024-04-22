import { type OrNever } from '@common/@types';
import { RoleEnum } from '@common/@types/enums';
import { CurrentUser, DecoratedController, Public, Swagger } from '@common/decorators';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { UserDto } from '@modules/user/dtos/user.dto';
import { Body, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sing-in.dto';

@DecoratedController('auth', false)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @Public()
  @Swagger({
    response: UserDto,
    body: SignUpDto,
    status: HttpStatus.CREATED,
    operation: 'Sign up',
  })
  public async signUp(@Body() body: SignUpDto): Promise<UserDto> {
    return this.authService.signup(body);
  }

  @Post('sign-in')
  @Swagger({
    response: UserDto,
    body: SignInDto,
    operation: 'Sign in',
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard, RoleGuard(RoleEnum.USER))
  public async signIn(@CurrentUser() user: UserDto): Promise<UserDto> {
    return this.authService.signin(user);
  }

  @Get('me')
  @ApiBearerAuth('JWT')
  @Swagger({
    operation: 'Get current user.',
    response: UserDto,
  })
  public async getCurrentUser(@CurrentUser() user: UserDto): Promise<OrNever<UserDto>> {
    return user;
  }
}
