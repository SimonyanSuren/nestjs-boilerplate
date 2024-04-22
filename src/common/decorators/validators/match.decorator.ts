import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints as unknown[];
    const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName as string];

    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const property = args.property;
    const [relatedPropertyName] = args.constraints as unknown[];

    return `${property} should be equal to ${relatedPropertyName as string}`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
