import { Injectable } from '@nestjs/common';

import { type CreateRoleDto } from './dtos/create-role.dto';
import { RoleDto } from './dtos/role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async create(createDto: CreateRoleDto): Promise<RoleDto> {
    const dto = RoleDto.create(createDto);

    return this.roleRepository.create(dto);
  }

  public async update(id: number, attributes: Partial<RoleDto>): Promise<RoleDto> {
    return this.roleRepository.update(id, attributes);
  }

  public async getById(id: number): Promise<RoleDto> {
    return this.roleRepository.findByIdOrThrow(id);
  }

  public async getAll(): Promise<RoleDto[]> {
    return this.roleRepository.findAll();
  }

  public async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
