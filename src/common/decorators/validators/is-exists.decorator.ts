import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, type EntitySchema, type ObjectType } from 'typeorm';

type ExistsValidationConstraints<E> = [ObjectType<E> | EntitySchema<E> | string, keyof E];

interface IExistsValidationArguments<E> extends ValidationArguments {
  constraints: ExistsValidationConstraints<E>;
}

@ValidatorConstraint({ name: 'isExists', async: true })
export class IsExistsConstraint<E> implements ValidatorConstraintInterface {
  constructor(private readonly em: EntityManager) {}

  async validate<Field extends keyof E>(
    value: E[Field],
    args: IExistsValidationArguments<E>,
  ): Promise<boolean> {
    const [entity, field] = args.constraints;

    return this.em.exists(entity, { where: { [field]: value } });
  }

  defaultMessage(args: IExistsValidationArguments<E>): string {
    return `The selected ${args.property.replace('Id', '')} id does not exist.`;
  }
}

export function IsExists<E>(
  entity: ObjectType<E> | EntitySchema<E> | string,
  field: keyof E,
  options?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ constructor: target }: Record<string, any>, propertyName: string): void =>
    registerDecorator({
      name: 'isExists',
      constraints: [entity, field],
      target,
      options,
      propertyName,
      validator: IsExistsConstraint,
    });
}
