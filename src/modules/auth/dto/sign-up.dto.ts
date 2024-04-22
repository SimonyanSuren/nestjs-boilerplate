import { RoleEnum } from '@common/@types/enums';
import { Match } from '@common/decorators';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Equals, IsISO8601 } from 'class-validator';

import {
  EmailField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from '../../../common/decorators/validators/field.validators';

export class SignUpDto {
  @EmailField({
    format: 'email',
    description: 'Email address',
    example: 'example@email.com',
  })
  readonly email: string;

  @PasswordField()
  readonly password: string;

  @Match('password', { message: 'Password is not match' })
  readonly rePassword: string;

  @StringField({ minLength: 2, maxLength: 50 })
  readonly firstName: string;

  @StringField({ minLength: 2, maxLength: 50 })
  readonly lastName: string;

  @PhoneFieldOptional()
  readonly phoneNumber?: string;

  @ApiProperty({ type: String, example: '1990-01-01' })
  @IsISO8601({ strict: true })
  readonly dob: string;

  @ApiHideProperty()
  @Equals(RoleEnum.USER)
  readonly roleId = RoleEnum.USER;
}
