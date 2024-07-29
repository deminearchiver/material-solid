import { createEffect, createSignal, mergeProps, splitProps, type Component, type JSX } from "solid-js"
import { createPresence } from "@material-solid/utils/presence";
import { Ripple } from "@material-solid/components/ripple";
import { containerStyle, iconStyle, indicatorStyle, labelStyle } from "./drawer-item.css";
import { MaterialSymbolController } from "@material-solid/components/icon";
import { mergeRefs } from "@solid-primitives/refs";
import { clsx } from "@material-solid/utils/clsx";

export type DrawerItemProps =
  & JSX.ButtonHTMLAttributes<HTMLButtonElement>
  & {
    selected?: boolean;
    leading: JSX.Element;
    label: JSX.Element;
    trailing?: JSX.Element;
  }
export const DrawerItem: Component<DrawerItemProps> = (props) => {
  const mergedProps = mergeProps(
    { selected: false },
    props
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "class",
      "selected",
      "leading",
      "label",
      "trailing",
    ],
  );
  let ref!: HTMLElement;

  const {
    isVisible,
    state,
  } = createPresence(() => local.selected, [600, 200]);

  return (
    <button
      ref={mergeRefs(element => ref = element, local.ref)}
      class={clsx(
        containerStyle({
          visible: isVisible(),
        }),
        local.class,
      )}
      {...others}>
        <Ripple for={ref} />
        <div class={
          indicatorStyle({
            visible: isVisible(),
            state: state(),
          })
        } />
        <MaterialSymbolController
          class={
            iconStyle({
              selected: isVisible(),
              state: state(),
            })
          }
          children={local.leading} />
        <span class={labelStyle}>
          {local.label}
        </span>
        {local.trailing}
    </button>
  );
}
