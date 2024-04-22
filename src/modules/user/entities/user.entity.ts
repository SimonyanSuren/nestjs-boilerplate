import { RoleEnum } from '@common/@types/enums/role.enum';
import { CoreEntity } from '@common/entity/core.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { RoleEntity } from '../../role/entities/role.entity';
import { type UserDto } from '../dtos/user.dto';

@Entity({ name: 'users' })
export class UserEntity extends CoreEntity implements UserDto {
  @Index()
  @Column({ type: String, length: 255, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public firstName: string;

  @Column({ type: 'varchar', length: 255 })
  public lastName: string;

  @Column({ type: 'int' })
  public roleId: RoleEnum;

  @Column({ type: 'int', nullable: true })
  public creatorId: number | null;

  @Column({ type: 'varchar', select: false })
  public password: string;

  @Column({ type: 'boolean', default: false })
  public isEmailVerified: boolean;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public phoneNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  public dob: string | null;

  @ManyToOne(() => RoleEntity, (role) => role.id, { eager: true })
  public role?: RoleEntity;
}
