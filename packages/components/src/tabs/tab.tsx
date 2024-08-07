import { createEffect, mergeProps, Show, splitProps, type Component, type JSX, type ParentComponent } from "solid-js";
import type { TabTokenProps } from "./tab-token";
import { mergeRefs } from "@solid-primitives/refs";
import { type ResizeHandler, createResizeObserver } from "@solid-primitives/resize-observer";
import { Focus } from "../focus";
import { Ripple } from "../ripple";
import { useTabBar, type TabBarVariant } from "./tab-bar";
import { tabContentStyle, tabStyle } from "./tab.css";
import { TabIndicator } from "./tab-indicator";

import { assignRef, type Ref } from "@material-solid/utils/refs";

export type TabElement =
  & HTMLButtonElement
  & {
    getContentRect(): DOMRect;
  }

export type TabProps =
  & Omit<
    JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    "ref" | "role" | "children"
  >
  & {
    ref?: Ref<TabElement>;
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
      "active",
      "children",
    ],
  );

  let ref!: HTMLButtonElement;
  let contentRef!: HTMLElement;

  const { variant } = useTabBar()!;


  const forwardRef = (element: HTMLButtonElement) => {
    Object.defineProperty(
      element, "getContentRect",
      {
        configurable: true,
        value: () => contentRef.getBoundingClientRect(),
      },
    )
    assignRef(
      local.ref,
      element as TabElement,
    );
  }

  return (
    <button
      ref={mergeRefs(element => ref = element, forwardRef)}
      class={
        tabStyle({
          active: local.active
        })
      }
      role="tab"
      {...others}>
        <Focus for={ref} />
        <Ripple for={ref} />
        <div
          ref={contentRef as HTMLDivElement}
          class={
            tabContentStyle({
              variant: variant(),
            })
          }
          children={local.children}/>
    </button>
  )
}

