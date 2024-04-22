import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Base entity class that provides common fields and functionality for all entities.
 */
export class CoreEntity {
  /**
   * The unique identifier for the entity.
   */
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  /**
   * Indicates whether the entity is active or not.
   */
  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  /**
   * The timestamp when the entity was soft deleted.
   */
  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
  })
  public deletedAt: Date | null;

  /**
   * The timestamp when the entity was created.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  /**
   * The timestamp when the entity was last updated.
   */
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;
}
