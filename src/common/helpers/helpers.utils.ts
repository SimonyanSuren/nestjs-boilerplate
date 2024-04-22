import process from 'node:process';

import { Environment } from '@common/@types/enums';
import { type ValidationError } from '@nestjs/common';
import bcrypt from 'bcrypt';

export const HelperService = {
  isDev(): boolean {
    return process.env.NODE_ENV === Environment.DEV;
  },

  isProd(): boolean {
    return process.env.NODE_ENV === Environment.PROD;
  },

  getVariableName<TResult>(getVar: () => TResult): string | undefined {
    const m = /\(\)=>(.*)/.exec(getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''));

    if (!m) {
      throw new Error("The function does not contain a statement matching 'return variableName;'");
    }

    const fullMemberName = m[1];

    const memberParts = fullMemberName?.split('.');

    return memberParts?.at(-1);
  },

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    // Hash the salt and the password together
    return bcrypt.hash(password, salt);
  },

  async comparePasswords(suppliedPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(suppliedPassword, password || '');
  },

  formatErrors(errors: ValidationError[], parent?: string): Record<string, string> {
    let formatted: Record<string, string> = {};

    for (const err of errors) {
      if (err.constraints) {
        const propertyName = parent ? `${parent}.${err.property}` : err.property;
        formatted[propertyName] = Object.values(err.constraints).join(', ');
      }

      if (err.children) {
        formatted = {
          ...formatted,
          ...this.formatErrors(err.children, err.property),
        };
      }
    }

    return formatted;
  },
};
