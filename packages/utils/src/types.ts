export type Unpack<T> = {
  [K in keyof T]: T[K] extends object ? Unpack<T[K]> : T[K]
}
export type Simplify<T> = T extends any
  ? {
      [K in keyof T]: Simplify<T[K]>;
    }
  : T;
