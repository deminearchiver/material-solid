import { splitProps, type Component, type JSX, type Ref } from "solid-js";
import type { TabBarVariant } from "./tab-bar";
import { tabIndicatorStyle } from "./tab-indicator.css";

export type TabIndicatorProps =
  & Omit<JSX.HTMLAttributes<HTMLElement>, "children">
  & { variant: TabBarVariant }

export const TabIndicator: Component<TabIndicatorProps> = (props) => {
  const [local, others] = splitProps(
    props,
    ["ref", "class", "variant"],
  );

  return (
    <div
      ref={local.ref as Ref<HTMLDivElement>}
      class={
        tabIndicatorStyle({
          variant: local.variant
        })
      }
      {...others} />
  );
}
