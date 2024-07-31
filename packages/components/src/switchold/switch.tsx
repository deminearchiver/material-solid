import { type Component, type JSX, createSignal, splitProps, createMemo, type ParentComponent, children, createEffect } from "solid-js";
import { switchDisabledStyle, switchHandleContainerStyle, switchHandleStyle, switchIconsStyle, switchIconStyle, switchInputStyle, switchSelectedStyle, switchStyle, switchTrackStyle, switchUnselectedStyle } from "./switch.css";
import { Ripple} from "../ripple";
import { resolveFirst } from "@solid-primitives/refs";
import clsx from "clsx/lite";
import { Focus } from "../focus";
import { MaterialSymbolController } from "../icon";

export interface SwitchProps extends JSX.HTMLAttributes<HTMLElement> {
  selected: boolean;
  onChanged: (value: boolean) => void;
  required?: boolean;
  disabled?: boolean;
}

export const Switch: ParentComponent<SwitchProps> = (props) => {
  const [localProps, otherProps] = splitProps(
    props,
    [
      "selected",
      "onChanged",
      "required",
      "disabled",
      "children",
      "class",
      "classList",
    ]
  );
  const resolved = resolveFirst(() => localProps.children);

  let inputRef!: HTMLInputElement;

  return (
    <div
      class={clsx(switchStyle, localProps.class)}
      onKeyDown={event => {
        const ignoreEvent = event.defaultPrevented || event.key !== "Enter";
        if (ignoreEvent || localProps.disabled) return;
        inputRef.click();
      }}
      classList={{
        [switchSelectedStyle]: props.selected,
        [switchUnselectedStyle]: !props.selected,
        [switchDisabledStyle]: props.disabled,
        ...localProps.classList,
      }}
      {...otherProps as JSX.HTMLAttributes<HTMLDivElement>}>
      <input
        ref={inputRef}
        class={switchInputStyle}
        disabled={props.disabled}
        required={props.required}
        checked={props.selected}
        role="switch"
        onChange={event => props.onChanged(event.currentTarget.checked)}
        onInput={event => props.onChanged(event.currentTarget.checked)}
        type="checkbox"
        aria-hidden="true" />
      <div class={switchTrackStyle({
        selected: props.selected,
      })}>
        <div
          class={
            switchHandleContainerStyle({
              selected: props.selected,
            })
          }>
            <div
              style={{
                position: "absolute",
                width: "40px",
                height: "40px",
                "border-radius": "4px",
              }}>
                <Focus
                  for={inputRef} />
            </div>
            <div
              style={{
                position: "absolute",
                width: "40px",
                height: "40px",
                "border-radius": "inherit",
              }}>
                <Ripple
                  for={inputRef} />
            </div>
            <div
              class={switchHandleStyle({
                selected: props.selected,
                icon: !!localProps.children,
              })}>
                <div class={switchIconsStyle({ selected: props.selected })}>
                  <MaterialSymbolController class={switchIconStyle}>
                    {localProps.children}
                  </MaterialSymbolController>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
