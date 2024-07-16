import { createEffect, createSignal, mergeProps, splitProps, type Accessor, type Component, type JSX } from "solid-js";
import { Focus } from "../focus";
import { Ripple} from "../ripple";
import { backgroundStyle, checkboxStyle, containerStyle, focusStyle, iconStyle, inputStyle, markStyle, outlineStyle, splashStyle, zoomStyle } from "./checkbox.css";
import clsx from "clsx/lite";


const createPrevious = <T,>(value: Accessor<T>) => {
  const [previous, setPrevious] = createSignal(value());
  createEffect<T>(
    prev => {
      setPrevious(() => prev);
      return value();
    },
    value(),
  );
  return previous;
}

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: string;
}
export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, others] = splitProps(
    props,
    [
      "checked",
      "disabled",
      "required",
      "value",
    ]
  );

  const [checked, setChecked] = createSignal(local.checked ?? false);

  const [intermediate, setIntermediate] = createSignal(false);

  const prevChecked = createPrevious(checked);
  const prevDisabled = createPrevious(() => local.disabled ?? false);

  let inputRef!: HTMLInputElement;

  return (
    <div
      class={checkboxStyle({
        disabled: local.disabled,
      })}>
        <div class={containerStyle}>
          <input
            ref={inputRef}
            class={inputStyle}
            type="checkbox"
            checked={checked()}
            required={local.required}
            value={local.value}
            onInput={event => {
              setChecked(event.currentTarget.checked);
            }}  />
          <div
            class={outlineStyle({
              selected: checked(),
              disabled: local.disabled,
            })} />
          <div
            class={
              backgroundStyle({
                selected: checked(),
                disabled: local.disabled,
              })
            } />
          <Focus class={focusStyle} for={inputRef} />
          <Ripple
            for={inputRef}
            disabled={local.disabled}
            class={splashStyle({
              selected: checked(),
            })} />
          <svg
            class={
              iconStyle({
                selected: checked(),
              })
            }
            viewBox="0 0 18 18"
            aria-hidden="true">
              <rect
                class={
                  markStyle({
                    kind: "short",
                    selected: checked(),
                  })
                } />
              <rect
                class={
                  markStyle({
                    kind: "long",
                    selected: checked(),
                  })
                } />
          </svg>
        </div>
    </div>
  );
}
