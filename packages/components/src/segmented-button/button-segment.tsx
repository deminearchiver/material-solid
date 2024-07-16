import { createToken } from "@solid-primitives/jsx-tokenizer";
import type { JSX, Component } from "solid-js";

export type ButtonSegmentData<T = unknown> =
  &  Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "aria-pressed" | "aria-selected" | "children"
  >
  & {
    value?: T;
    selected?: boolean;
    icon?: JSX.Element;
    label?: JSX.Element;
  };

export const ButtonSegmentToken = createToken<
  ButtonSegmentData,
  ButtonSegmentData
>(props => props);

// export const ButtonSegment = <
//   T = unknown
// >(props: ButtonSegmentData<T>) => {
//   return <ButtonSegmentToken {...props} />
// }

export const ButtonSegment = ButtonSegmentToken as <T = unknown>(props: ButtonSegmentData<T>) => JSX.Element;
