import { createEffect, createMemo, createSignal, mergeProps, onCleanup, splitProps, untrack, type Accessor, type Component, type JSX, type Signal } from "solid-js";
import { FilledField, type Field } from "../field";
import { createEventListenerMap, createEventSignal, type EventMapOf, type TargetWithEventMap } from "@solid-primitives/event-listener";
import { access,  type MaybeAccessor } from "@solid-primitives/utils";
import type { Override } from "@material-solid/utils/types";
import { Dynamic } from "solid-js/web";
import { styles } from "./text-field.css";
import type { Ref, RefCallback } from "@material-solid/utils/refs";

const createMatches = <
  Target extends Element,
  Events extends keyof EventMapOf<Target>,
  // HandlersMap extends Partial<EventHandlersMap<EventMap>>
>(
  target: MaybeAccessor<Target>,
  selectors: MaybeAccessor<string>,
  event: MaybeAccessor<Events[]>,
  initialValue: boolean = false,
): Accessor<boolean> => {
  const [matches, setMatches] = createSignal(initialValue);

  createEffect(() => {
    const element = access(target);
    const events = access(event);
    const selector = access(selectors);

    const listener = () => {
      setMatches(element.matches(selector));
    }

    events.forEach(event => element.addEventListener(event as string, listener));

    onCleanup(() => {
      events.forEach(event => element.removeEventListener(event as string, listener))
    });
  });

  return matches;
}



const createFocus = (target: MaybeAccessor<HTMLElement>): Accessor<boolean> => {
  const [focused, setFocused] = createSignal(false);

  const handleFocusChange = () => {
    const element = access(target);
    setFocused(element.matches(":focus"));
  }

  createEventListenerMap(
    target,
    {
      focus: handleFocusChange,
      blur: handleFocusChange,
    },
  );

  return focused;
}

const createHover = (target: MaybeAccessor<HTMLElement>): Accessor<boolean> => {
  const [hovered, setHovered] = createSignal(false);

  const handlePointerEvent = () => {
    const element = access(target);
    setHovered(element.matches(":hover"));
  }

  createEventListenerMap(
    target,
    {
      pointerenter: handlePointerEvent,
      pointerleave: handlePointerEvent,
    },
  );

  return hovered;
}


export type TextFieldType =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | "textarea";

type ResolvableProps<
  Resolved extends boolean = false,
  SharedProps = {},
  UnresolvedProps = {},
  ResolvedProps = {},
> = Resolved extends true
  ? Override<SharedProps, ResolvedProps>
  : Override<SharedProps, UnresolvedProps>;

type TextFieldInputElement = HTMLInputElement | HTMLTextAreaElement;

export namespace TextField {
  export type Props<Resolved extends boolean = false> =
    & ProtectedProps<Resolved>
    & PublicProps<Resolved>;

  export type ProtectedProps<Resolved extends boolean = false> = {
    fieldComponent: Component<Field.PublicProps>;
  }

  export type PublicProps<
    Resolved extends boolean = false
  > = ResolvableProps<
    Resolved,
    {
      ref?: Ref<Element>;
      onChange?: JSX.ChangeEventHandlerUnion<
        TextFieldInputElement,
        Event
      >;
      onInput?: JSX.InputEventHandlerUnion<
        TextFieldInputElement,
        InputEvent
      >;
      onSelect?: JSX.EventHandlerUnion<
        TextFieldInputElement, Event>;
    },
    {
      type?: TextFieldType;
      value?: string;
      label?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
    },
    {
      type: TextFieldType;
      value: string;
      placeholder: string;
      label: string;
      disabled: boolean;
      required: boolean;
    }
  >;

  export interface Element {
    focus(): void;
  }
}

export const TextField = <
  Resolved extends boolean = false
>(
  props: TextField.Props<Resolved>,
) => {
  const mergedProps = mergeProps(
    {
      type: "text",
      value: "",
      placeholder: "",
      label: "",
      required: false,
      disabled: false,
    } as TextField.Props<true>,
    props,
  ) as TextField.Props<true>;

  const [, local] = splitProps(
    mergedProps,
    [],
  );

  const [inputRef, setInputRef] = createSignal() as Signal<HTMLInputElement | HTMLTextAreaElement>;

  const focused = createFocus(inputRef);

  const useTextarea = createMemo(() => local.type === "textarea");

  createEffect(() => {
    const element: TextField.Element = {
      focus: () => inputRef()?.focus(),
    };
    (local.ref as RefCallback<TextField.Element> | undefined)
      ?.(element);
  });

  return (
    <span class={styles.textField()}>
      <Dynamic<Component<Field.PublicProps>>
        component={local.fieldComponent}
        focused={focused()}
        start={<span></span>}
        end={<span></span>}
        label={local.label}
        disabled={local.disabled}
        required={local.required}
        populated={!!local.value}
        content={
          <div
            class={
              styles.inputWrapper()
            }>
              <span>
                {/* // TODO: prefix */}
              </span>
              <input
                ref={setInputRef}
                class={
                  styles.input()
                }
                type={local.type}
                value={local.value}
                placeholder={local.placeholder}
                aria-label={local.label}
                onChange={local.onChange}
                onSelect={local.onSelect}
                onInput={local.onInput} />
              <span>
                {/* //TODO: suffix */}
              </span>
          </div>
        } />
    </span>
  );
}




