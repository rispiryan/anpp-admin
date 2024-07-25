export type ValueOf<T> = T[keyof T];

export interface IError {
  errors: { reasonKey: string; message: string }[];
  title: string;
  type: string;
}
