import { type JSX, splitProps, type ParentComponent, createMemo, createSignal, type Signal, mergeProps } from "solid-js";
import { iconButtonStyle } from "./icon-button.css";
import { Ripple} from "../ripple";
import clsx from "clsx/lite";
import { mergeRefs } from "@solid-primitives/refs";
import { Dynamic } from "solid-js/web";

type IconButtonVariant =
  | "regular"
  | "filled"
  | "filledTonal"
  | "outlined";

export type IconButtonProps = {
  variant?: IconButtonVariant;
  selected?: boolean;
  children: JSX.Element;
} & (
  | JSX.ButtonHTMLAttributes<HTMLButtonElement>
  | JSX.AnchorHTMLAttributes<HTMLAnchorElement>
);

export const IconButton: ParentComponent<IconButtonProps> = (props) => {
  const mergedProps = mergeProps(
    { variant: "regular" as IconButtonVariant, selected: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "class",
      "variant",
      "selected",
      "children",
    ],
  );

  const [ref, setRef] = createSignal() as Signal<HTMLElement>;


  const tag = createMemo(() => {
    return "href" in others ? "a" : "button";
  });

  return (
    <Dynamic
      component={tag()}
      ref={mergeRefs(setRef, local.ref as HTMLElement)}
      class={
        clsx(
          iconButtonStyle({
            variant: local.variant,
            selected: local.selected,
          }),
          local.class
        )
      }
      {...others}>
        <Ripple
          for={ref}
          disabled={"disabled" in props && props.disabled} />
        {local.children}
    </Dynamic>
  );
}
