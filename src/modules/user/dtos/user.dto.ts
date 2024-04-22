/* eslint-disable lines-between-class-members */
import { type RoleEnum } from '@common/@types/enums';
import { RoleDto } from '@modules/role/dtos/role.dto';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance, Type } from 'class-transformer';

import { type UserEntity } from '../entities/user.entity';
import { type CreateUserDto } from './create-user.dto';

export class UserDto {
  @ApiProperty({ type: Number, example: 1 })
  public id: number;

  public email: string;

  public firstName: string;

  public lastName: string;

  public roleId: RoleEnum;

  public creatorId: number | null;

  //@Exclude({ toPlainOnly: true })
  public password: string;

  public isEmailVerified: boolean;

  public phoneNumber: string | null;

  public dob: string | null;

  public updatedAt: Date;

  public createdAt: Date;

  @Exclude()
  @ApiHideProperty()
  public isActive: boolean;

  @Exclude()
  @ApiHideProperty()
  public deletedAt: Date | null;

  @Type(() => RoleDto)
  public role?: RoleDto;

  public token?: string;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }

  static create(createDto: CreateUserDto): UserDto {
    return new UserDto(createDto);
  }

  static toDto(entity: UserEntity): UserDto {
    return plainToInstance(UserDto, entity);
  }

  static toDtos(entities: UserEntity[]): UserDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
