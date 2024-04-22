import { DecoratedController, Swagger } from '@common/decorators';
import { Body, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleDto } from './dtos/role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleService } from './role.service';

@DecoratedController('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Swagger({
    operation: 'Create role.',
    status: HttpStatus.CREATED,
    body: CreateRoleDto,
    response: RoleDto,
  })
  public async createRole(
    //@CurrentUser() user: UserDto,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.create(createRoleDto);
  }

  @Patch(':id')
  @Swagger({
    operation: 'Update role.',
    status: HttpStatus.OK,
    params: [{ name: 'id', type: Number }],
    body: UpdateRoleDto,
    response: RoleDto,
  })
  public async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDto> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Get(':id')
  @Swagger({
    operation: 'Get role by id.',
    status: HttpStatus.OK,
    params: [{ name: 'id', type: Number }],
    response: RoleDto,
  })
  public async getById(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    return this.roleService.getById(id);
  }

  @Get()
  @Swagger({
    operation: 'Get role list.',
    status: HttpStatus.OK,
    response: RoleDto,
    isArray: true,
  })
  public async getRoles(): Promise<RoleDto[]> {
    return this.roleService.getAll();
  }

  @Delete(':id')
  @Swagger({
    operation: 'Delete role by id.',
    status: HttpStatus.NO_CONTENT,
    params: [{ name: 'id', type: Number }],
  })
  public async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
