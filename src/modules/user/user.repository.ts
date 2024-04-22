import { type Nullable } from '@common/@types';
import { Codes } from '@common/constants';
import { HelperService } from '@common/helpers';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { type FilterUserDto } from './dtos/filter-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public async create(dto: UserDto): Promise<UserDto> {
    dto.password = await HelperService.hashPassword(dto.password);

    const entity = this.repository.create(dto);
    await this.repository.save(entity);

    return UserDto.toDto(entity);
  }

  public async update(id: number, attributes: Partial<UserDto>): Promise<UserDto> {
    const user = await this.findByIdOrThrow(id);

    if (attributes.password) {
      attributes.password = await HelperService.hashPassword(attributes.password);
    }

    const updated = await this.repository.save({ ...user, ...attributes });

    return UserDto.toDto(updated);
  }

  public async findById(id: number): Promise<Nullable<UserDto>> {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) return null;

    return UserDto.toDto(user);
  }

  public async findByIdOrThrow(id: number): Promise<UserDto> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(Codes.NOT_FOUND_ERROR);
    }

    return user;
  }

  public async findAll(): Promise<UserDto[]> {
    const users = await this.repository.find();

    return UserDto.toDtos(users);
  }

  public async find(filer: FilterUserDto): Promise<UserDto[]> {
    const users = await this.repository.find({
      where: { ...filer },
    });

    return UserDto.toDtos(users);
  }

  public async findByEmail(email: string): Promise<Nullable<UserDto>> {
    const user = await this.repository.findOneBy({ email });

    if (!user) return null;

    return UserDto.toDto(user);
  }

  public async findByEmailWithPassword(email: string): Promise<Nullable<UserDto>> {
    const user = await this.repository
      .createQueryBuilder('u')
      .where('email = :email', { email })
      .addSelect('u.password')
      .getOne();

    if (!user) return null;

    return UserDto.toDto(user);
  }

  public async delete(id: number): Promise<UserDto> {
    const user = await this.findByIdOrThrow(id);
    const deleted = await this.repository.softRemove(user);

    return UserDto.toDto(deleted);
  }
}
