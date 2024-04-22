export interface IErrorDetails {
  code: number;
  message: string | Record<string, string>;
  errorName?: string;
}
