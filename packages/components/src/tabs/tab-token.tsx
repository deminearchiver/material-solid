import { createToken } from "@solid-primitives/jsx-tokenizer";
import type { JSX } from "solid-js";

export type TabTokenProps =
  | {
    icon?: JSX.Element;
    label: JSX.Element;
  }

export const TabToken = createToken<TabTokenProps>();
