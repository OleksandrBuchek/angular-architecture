import { IsNever } from './is-never.type';

export type WithPartialUndefinedValues<T extends object> = {
  [Key in keyof T as IsNever<Extract<T[Key], undefined>> extends true ? never : Key]?: T[Key];
} & {
  [Key in keyof T as IsNever<Extract<T[Key], undefined>> extends true ? Key : never]: T[Key];
};
