import { type Nullable } from '@common/@types';
import { Codes } from '@common/constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleDto } from './dtos/role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  public async create(dto: RoleDto): Promise<RoleDto> {
    const entity = this.repository.create(dto);
    await this.repository.save(entity);

    return RoleDto.toDto(entity);
  }

  public async update(id: number, attributes: Partial<RoleDto>): Promise<RoleDto> {
    const role = await this.findById(id);
    const updated = await this.repository.save({ ...role, ...attributes });

    return RoleDto.toDto(updated);
  }

  public async findById(id: number): Promise<Nullable<RoleDto>> {
    const role = await this.repository.findOne({ where: { id } });

    if (!role) return null;

    return RoleDto.toDto(role);
  }

  public async findByIdOrThrow(id: number): Promise<RoleDto> {
    const role = await this.findById(id);

    if (!role) {
      throw new NotFoundException(Codes.NOT_FOUND_ERROR);
    }

    return RoleDto.toDto(role);
  }

  public async findAll(): Promise<RoleDto[]> {
    const roles = await this.repository.find();

    return RoleDto.toDtos(roles);
  }

  public async delete(id: number): Promise<RoleDto> {
    const role = await this.findByIdOrThrow(id);
    const deleted = await this.repository.remove(role);

    return RoleDto.toDto(deleted);
  }
}
