/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
export type OrNever<T> = T | never;

export type RecordWithFile<T, K = File> = T & {
  files: K;
};
