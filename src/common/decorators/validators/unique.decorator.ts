import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, type EntitySchema, type ObjectType } from 'typeorm';

type UniqueValidationConstraints<E> = [ObjectType<E> | EntitySchema<E> | string, keyof E];

interface IUniqueValidationArguments<E> extends ValidationArguments {
  constraints: UniqueValidationConstraints<E>;
}

@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueConstraint<E> implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  async validate<Field extends keyof E>(
    value: E[Field],
    args: IUniqueValidationArguments<E>,
  ): Promise<boolean> {
    const [entity, field] = args.constraints;

    return !(await this.em.exists(entity, { where: { [field]: value } }));
  }

  defaultMessage(args: IUniqueValidationArguments<E>): string {
    return `The ${args.property} already exists.`;
  }
}

export function IsUnique<E>(
  entity: ObjectType<E> | EntitySchema<E> | string,
  field: keyof E,
  options?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ constructor: target }: Record<string, any>, propertyName: string): void =>
    registerDecorator({
      name: 'isUnique',
      constraints: [entity, field],
      target,
      options,
      propertyName,
      validator: UniqueConstraint,
    });
}
