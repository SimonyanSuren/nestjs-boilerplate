import { RoleEnum } from '@common/@types/enums/role.enum';
import { HelperService } from '@common/helpers';
import { RoleEntity } from '@modules/role/entities/role.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { SYSTEM_DATA } from './seed.data';

@Injectable()
export class SeedService implements OnModuleInit {
  private logger = new Logger(SeedService.name);

  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  public async onModuleInit(): Promise<void> {
    this.logger.verbose('Seeding started...');

    await this.seedUserRoles();
    await this.seedSuperAdmin();
  }

  private async seedUserRoles(): Promise<void> {
    const data = SYSTEM_DATA.roles;

    try {
      const checkData = await this.entityManager.find(RoleEntity, { take: 1 });

      if (checkData.length === 0) {
        await this.entityManager.save(
          RoleEntity,
          data.map((item) => this.entityManager.create(RoleEntity, item)),
        );
      }
    } catch (error) {
      this.logger.log(error);
    }
  }

  private async seedSuperAdmin(): Promise<void> {
    try {
      const email = process.env.SUPER_ADMIN_USERNAME || 'support@bilerplate.com';
      const password =
        process.env.SUPER_ADMIN_PASSWORD ||
        ((): never => {
          throw new Error('SUPER_ADMIN_PASSWORD is not defined in environment.');
        })();
      const hashedPassword = await HelperService.hashPassword(password);

      const users: Array<Omit<UserEntity, 'id'>> = [
        {
          email,
          lastName: 'Super',
          firstName: 'Admin',
          password: hashedPassword,
          roleId: RoleEnum.SUPER_ADMIN,
          dob: null,
          phoneNumber: null,
          creatorId: null,
          isActive: true,
          isEmailVerified: true,
          deletedAt: null,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];

      const checkUserData = await this.entityManager.find(UserEntity, { where: { email } });

      if (checkUserData.length === 0) {
        await this.entityManager.save(
          UserEntity,
          users.map((user) => this.entityManager.create(UserEntity, user)),
        );
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
