import { type IPackageJson } from '@common/@types/interfaces/package-json.interface';

export const VERSION_VALIDATION_MESSAGE = 'Version must start with "v" followed by a number.';
export const REQUEST_ID_HEADER = 'x-request-id';
export const FORWARDED_FOR_HEADER = 'x-forwarded-for';

// Swagger constants
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const packageJson = require('./../../../package.json') as IPackageJson;

export const APP_NAME = packageJson.name;
export const SWAGGER_API_CURRENT_VERSION = packageJson.version;
export const SWAGGER_DESCRIPTION = packageJson.description!;
export const SWAGGER_TITLE = `Boilerplate API Documentation`;
export const SWAGGER_API_ENDPOINT = 'docs';
