import { type Component, createEffect, createSignal, type JSX, splitProps } from "solid-js";
import { focusStyle } from "./focus.css";
import { createEventListenerMap } from "@solid-primitives/event-listener";
import { type MaybeAccessor, access } from "@solid-primitives/utils";
import clsx from "clsx/lite";
import { mergeRefs } from "@solid-primitives/refs";
import { getVarName } from "@material-solid/utils/vanilla-extract";
import { THEME } from "@material-solid/vanilla-extract/contract";

export type FocusProps =
  & Omit<
    JSX.HTMLAttributes<HTMLElement>,
    | keyof JSX.CustomEventHandlersLowerCase<HTMLElement>
    | keyof JSX.CustomEventHandlersCamelCase<HTMLElement>
    | "children"
  >
  & {
    for: MaybeAccessor<HTMLElement>;
    onFocusChanged?: (value: boolean) => void;
    visible?: boolean;
  };

export const Focus: Component<FocusProps> = (props) => {
  const [local, others] = splitProps(
    props,
    ["ref", "for",  "onFocusChanged", "visible", "class"],
  );

  let ref!: HTMLElement;

  const [visible, setVisible] = createSignal(false);

  createEventListenerMap(
    local.for,
    {
      focusin: () => {
        setVisible(access(local.for).matches(":focus-visible"));
      },
      focusout: () => void setVisible(false),
      pointerdown: () => void setVisible(false),
    }
  );

  createEffect(
    () => {
      const value = visible();
      local.onFocusChanged?.(value);

      if(!value) {
        console.log("ANIMATE");
        ref.animate(
          [{
            "outline-width": 0,
          }],
          {
            fill: "forwards",
            duration: 200,
            easing: getComputedStyle(document.documentElement)
              .getPropertyValue(getVarName(THEME.easing.standardAccelerate)),
          },
        );
      }
    }
  );

  return (
    <div
      ref={mergeRefs(element => ref = element, local.ref)}
      class={clsx(
        focusStyle({
          visible: local.visible ?? visible(),
        }),
        local.class,
      )}
      {...others} />
  )
}
