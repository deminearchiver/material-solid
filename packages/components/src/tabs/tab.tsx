import { createEffect, mergeProps, Show, splitProps, type Component, type JSX, type ParentComponent } from "solid-js";
import type { TabTokenProps } from "./tab-token";
import { mergeRefs } from "@solid-primitives/refs";
import { type ResizeHandler, createResizeObserver } from "@solid-primitives/resize-observer";
import { Focus } from "../focus";
import { Ripple } from "../ripple";
import type { TabBarVariant } from "./tab-bar";
import { tabContentStyle, tabStyle } from "./tab.css";
import { TabIndicator } from "./tab-indicator";

export type TabProps =
  & Omit<
    JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    "role" | "children"
  >
  & TabTokenProps
  & {
    variant: TabBarVariant;
    active: boolean;
  };

export const Tab: ParentComponent<TabProps> = (props) => {
  const mergedProps = mergeProps(
    { showIndicator: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "variant",
      "active",
      "icon",
      "label",
      "children",
    ],
  );

  let ref!: HTMLButtonElement;
  return (
    <button
      ref={mergeRefs(element => ref = element, local.ref)}
      class={
        tabStyle({
          active: local.active
        })
      }
      role="tab"
      {...others}>
        <Focus for={ref} />
        <Ripple for={ref} />
        <div class={
          tabContentStyle({
            variant: local.variant,
          })
        }>
          {local.icon}
          {local.label}
          {local.children}
        </div>
    </button>
  )
}

