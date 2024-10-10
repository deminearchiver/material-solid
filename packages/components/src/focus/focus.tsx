import { type Component, createEffect, createSignal, type JSX, splitProps } from "solid-js";
import { focusStyle } from "./focus.css";
import { createEventListenerMap } from "@solid-primitives/event-listener";
import { type MaybeAccessor, access } from "@solid-primitives/utils";
import clsx from "clsx/lite";

export namespace Focus {
  export type Props =
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
}

export const Focus: Component<Focus.Props> = (props) => {
  const [local, others] = splitProps(
    props,
    ["ref", "for",  "onFocusChanged", "visible", "class"],
  );

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

  return (
    <div
      ref={local.ref as HTMLDivElement}
      class={clsx(
        focusStyle({
          visible: local.visible ?? visible(),
        }),
        local.class,
      )}
      {...others} />
  )
}
