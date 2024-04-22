import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { type CreateUserDto } from './dtos/create-user.dto';
import { type UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const dto = UserDto.create(createUserDto);

    return this.userRepository.create(dto);
  }

  public async update(id: number, attributes: UpdateUserDto): Promise<UserDto> {
    return this.userRepository.update(id, attributes);
  }

  public async getById(id: number): Promise<UserDto> {
    return this.userRepository.findByIdOrThrow(id);
  }

  public async getAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
