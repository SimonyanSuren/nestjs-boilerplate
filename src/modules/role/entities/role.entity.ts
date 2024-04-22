import { CoreEntity } from '@common/entity/core.entity';
import { Column, Entity } from 'typeorm';

import { type RoleDto } from '../dtos/role.dto';

@Entity({ name: 'roles' })
export class RoleEntity extends CoreEntity implements RoleDto {
  @Column({ type: 'varchar' })
  public name: string;
}
