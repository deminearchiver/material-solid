import { createEffect, createMemo, mergeProps, Show, splitProps, type Component, type JSX } from "solid-js";
import { useWindowScrollPosition } from "@solid-primitives/scroll";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { normalize, normalizeClamp } from "@material-solid/utils";
import { clamp } from "@solid-primitives/utils";
import { MaterialSymbolController } from "@material-solid/components/icon";
import { actionsStyle, dynamicContainerStyle, leadingStyle, staticContainerStyle, staticHeadlineStyle } from "./top-app-bar.css";


const COLLAPED_HEIGHT = 64;

export type TopAppBarVariant = "small" | "medium" | "large";

export type AppBarProps = {
  leading?: JSX.Element;
  headline: JSX.Element;
  actions?: JSX.Element;
}
export const DynamicTopAppBar: Component<AppBarProps> = (props) => {

  return (
    <header class={dynamicContainerStyle()}>
      <StaticTopAppBar {...props} />
    </header>
  );
}


type StaticTopAppBarProps = {
  scrolledUnder?: boolean;
  centered?: boolean;
  leading?: JSX.Element;
  headline: JSX.Element;
  actions?: JSX.Element;
}
const StaticTopAppBar: Component<StaticTopAppBarProps> = (props) => {
  const mergedProps = mergeProps(
    {
      centered: false,
    },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "centered",
      "leading",
      "headline",
      "actions",
    ],
  );
  return (
    <div
      class={staticContainerStyle({})}>
        <Show when={local.leading}>
          <div class={leadingStyle}>
            {local.leading}
          </div>
        </Show>
        <span
          class={
            staticHeadlineStyle({
              centered: local.centered
            })
          }>
            {local.headline}
        </span>
        <Show when={local.actions}>
          <div class={actionsStyle}>
            {local.actions}
          </div>
        </Show>
    </div>
  )
}

export const TopAppBar = {
  small: DynamicTopAppBar,
  medium: DynamicTopAppBar,
  large: DynamicTopAppBar,
};
