import { CurrentUser, DecoratedController, Swagger } from '@common/decorators';
import { Body, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@DecoratedController('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Swagger({
    operation: 'Create user.',
    status: HttpStatus.CREATED,
    body: CreateUserDto,
    response: UserDto,
  })
  public async createUser(
    @CurrentUser() user: UserDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return this.userService.create({ ...createUserDto, creatorId: user.id });
  }

  @Patch(':id')
  @Swagger({
    operation: 'Update user.',
    status: HttpStatus.OK,
    params: [{ name: 'id', type: Number }],
    body: UpdateUserDto,
    response: UserDto,
  })
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  @Swagger({
    operation: 'Get user by id.',
    status: HttpStatus.OK,
    params: [{ name: 'id', type: Number }],
    response: UserDto,
  })
  public async getById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.getById(id);
  }

  @Get()
  @Swagger({
    operation: 'Get users list.',
    status: HttpStatus.OK,
    response: UserDto,
    isArray: true,
  })
  public async getUsers(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Delete(':id')
  @Swagger({
    operation: 'Delete user by id.',
    status: HttpStatus.NO_CONTENT,
    params: [{ name: 'id', type: Number }],
  })
  public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
