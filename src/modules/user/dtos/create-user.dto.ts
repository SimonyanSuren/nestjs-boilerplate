import { RoleEnum } from '@common/@types/enums/role.enum';
import {
  BooleanField,
  EmailField,
  IsUnique,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from '@common/decorators';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Equals, IsISO8601 } from 'class-validator';

import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @EmailField({
    format: 'email',
    description: 'Email address',
    example: 'example@email.com',
  })
  @IsUnique(UserEntity, 'email')
  readonly email: string;

  @PasswordField()
  readonly password: string;

  @StringField({ minLength: 2, maxLength: 50 })
  readonly firstName: string;

  @StringField({ minLength: 2, maxLength: 50 })
  readonly lastName: string;

  @ApiHideProperty()
  @Equals(RoleEnum.USER)
  readonly roleId: RoleEnum = RoleEnum.USER;

  @BooleanField()
  readonly isActive?: boolean;

  @BooleanField()
  readonly isEmailVerified?: boolean;

  @PhoneFieldOptional()
  readonly phoneNumber?: string | null;

  @ApiProperty({ type: String, example: '1990-01-01' })
  @IsISO8601({ strict: true })
  readonly dob?: string;

  @ApiHideProperty()
  declare readonly creatorId?: number;
}
