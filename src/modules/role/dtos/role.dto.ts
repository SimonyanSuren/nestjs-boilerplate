/* eslint-disable lines-between-class-members */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToInstance } from 'class-transformer';

import { type RoleEntity } from '../entities/role.entity';
import { type CreateRoleDto } from './create-role.dto';

export class RoleDto {
  @ApiProperty({ type: Number, example: 1 })
  public id: number;

  public name: string;

  @Exclude()
  public isActive: boolean;

  @Exclude()
  @ApiHideProperty()
  public deletedAt: Date | null;

  public updatedAt: Date;

  public createdAt: Date;

  constructor(dto: CreateRoleDto) {
    Object.assign(this, dto);
  }

  static create(createDto: CreateRoleDto): RoleDto {
    return new RoleDto(createDto);
  }

  static toDto(entity: RoleEntity): RoleDto {
    return plainToInstance(RoleDto, entity);
  }

  static toDtos(entities: RoleEntity[]): RoleDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
