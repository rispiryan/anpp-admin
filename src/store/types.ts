export type ValueOf<T> = T[keyof T];

export type Action<Types, Payload> = {
  type: ValueOf<Types>;
  payload: Payload;
};

export type Store = NonNullable<unknown>;

export interface Reducer<T, A> {
  (state: T, action: Action<A, any>): T;
}
