export type Simplify<T> = T extends any
  ? {
      [K in keyof T]: Simplify<T[K]>;
    }
  : T;

/**
 * Works like {@link Simplify}, but doesn't simplify the specified leaf type
 *
 * @typeParam T - source object
 * @typeParam U - types to exclude from simplifying
 */
export type SimplifyLeaf<T, U> = T extends any
  ? {
    [K in keyof T]: T[K] extends U ? T[K] : Simplify<T[K]>;
  }
  : T;
