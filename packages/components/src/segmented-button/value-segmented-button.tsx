import { createToken, resolveTokens, type JSXTokenizer, type TokenElement } from "@solid-primitives/jsx-tokenizer";
import { createSignal, type JSX, type Component, type ParentProps, For, splitProps, type Accessor, createMemo } from "solid-js";
import { ReactiveSet } from "@solid-primitives/set";

import { SegmentedButtonGroup, ButtonSegmentButton } from "./base";


export type ValidValue = string | number | symbol;

export type BaseValueSegmentedButtonProps<T> =
  & Omit<JSX.HTMLAttributes<HTMLElement>, "children">
  & {
    onSelectionChange?: (values: T) => void;
    selected: T;
    disabled?: boolean;
    children: JSX.Element;
  };

// export type SingleValueSegmentedButtonProps<
//   T extends ValidValue
// > = BaseValueSegmentedButtonProps<T>;

// export type MultiValueSegmentedButtonProps<
//   T extends ValidValue,
//   V extends T[] | Set<T> | Record<T, boolean>,
// > = BaseValueSegmentedButtonProps<V>;


export type ValueSegmentedButtonProps<
  T extends ValidValue,
> = BaseValueSegmentedButtonProps<T>;
export const ValueSegmentedButton = <
  T extends ValidValue,
>(
  props: ParentProps<ValueSegmentedButtonProps<T>>,
) => {
  const [local, others] = splitProps(
    props,
    [
      "onSelectionChange",
      "selected",
      "disabled",
      "children",
    ],
  )

  const tokens = resolveTokens(
    ButtonSegment,
    () => props.children,
  ) as Accessor<TokenElement<ButtonSegmentProps<T>>[]>;

  return (
    <SegmentedButtonGroup
      disabled={local.disabled}>
        <For each={tokens()}>{
          ({ data: segment }, index) => {
            if(segment.value === undefined) {
              throw new Error("");
            }
            return (
              <ButtonSegmentButton
                onClick={() => local.onSelectionChange?.(segment.value)}
                selected={local.selected === segment.value}
                icon={segment.icon}
                label={segment.label} />
            );
          }
        }</For>
    </SegmentedButtonGroup>
  );
}


export type ButtonSegmentProps<T extends ValidValue> = {
  value: T;
  icon?: JSX.Element;
  label?: JSX.Element;
}
type ButtonSegmentComponent =
  & (<T extends ValidValue>(props: ButtonSegmentProps<T>) => JSX.Element)
  & JSXTokenizer<ButtonSegmentProps<ValidValue>>;
export const ButtonSegment = createToken<ButtonSegmentProps<ValidValue>>() as ButtonSegmentComponent;
