export type Ref<T> = T | RefCallback<T>;

export type RefCallback<T> = (value: T) => void;

export const setRef = <T>(
  ref: Ref<T> | undefined,
  value: T,
) => {
  (ref as RefCallback<T> | undefined)?.(value);
}
