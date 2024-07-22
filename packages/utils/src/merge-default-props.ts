import { mergeProps } from "solid-js"




type ExcludeRequired<T> = {
  [P in keyof T as undefined extends T[P] ? T[P] & string : never]: T[P];
}

type MergeDefaultProps<T, D> = {

}

export const mergeDefaultProps = <T, D extends ExcludeRequired<T>>(
  props: T,
  defaults: D,
) => {
  return mergeProps(defaults, props) as MergeDefaultProps<T, D>;
}
