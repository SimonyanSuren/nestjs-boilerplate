import { EmailField, StringField } from '@common/decorators';

export class SignInDto {
  @EmailField({
    format: 'email',
    description: 'Email address',
    example: 'example@email.com',
  })
  readonly email: string;

  @StringField({
    example: 'someStrongPassword',
  })
  readonly password: string;
}
