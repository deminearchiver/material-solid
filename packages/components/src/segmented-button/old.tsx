import { children, createEffect, createMemo, createRenderEffect, createSignal, For, getOwner, mergeProps, runWithOwner, splitProps, type ChildrenReturn, type Component, type FlowComponent, type JSX, type ParentComponent } from "solid-js";
import { isToken, resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { ButtonSegmentToken, type ButtonSegmentData } from "./button-segment";
import { Ripple } from "../ripple";
import { Focus } from "../focus";
import { mergeRefs, resolveElements, resolveFirst } from "@solid-primitives/refs";
import { MaterialSymbolController } from "../icon";
import { Dynamic } from "solid-js/web";

import {
  buttonSegmentCheckmarkPathStyle,
  buttonSegmentCheckmarkStyle,
  buttonSegmentGraphicStyle,
  buttonSegmentIconStyle,
  buttonSegmentLeadingStyle,
  buttonSegmentMaterialSymbolStyle,
  buttonSegmentOutlineStyle,
  buttonSegmentStyle,
  buttonSegmentTouchStyle,
  segmentedButtonStyle,
} from "./base.css";


export type SegmentedButtonProps<T> = {
  disabled?: boolean;
  children: JSX.Element;
} & JSX.HTMLAttributes<HTMLElement>;

export const SegmentedButton = <
  T,
>(props: SegmentedButtonProps<T>) => {
  const mergedProps = mergeProps(
    { disabled: false, },
    props,
  );

  const [local, others] = splitProps(
    mergedProps,
    ["disabled", "children"]
  );
  const tokens = resolveTokens(
    ButtonSegmentToken,
    () => local.children,
    // { includeJSXElements: true },
  );

  return (
    <span
      class={segmentedButtonStyle}
      role="group"
      {...others}>
        <For each={tokens().filter(token => isToken(ButtonSegmentToken, token))}>{
          segment => (
            <ButtonSegment
              {...segment.data}
              disabled={local.disabled} />
          )
        }</For>
    </span>
  );
}




type AnimationState = "selecting" | "deselecting";


type ButtonSegmentProps = ButtonSegmentData & {
  disabled: boolean;
}
const ButtonSegment: Component<ButtonSegmentProps> = (props) => {
  const mergedProps = mergeProps(
    { selected: false, disabled: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "value",
      "disabled",
      "selected",
      "icon",
      "label",
    ]
  )

  let ref!: HTMLButtonElement;

  const label = children(() => local.label);
  const hasLabel = createMemo(() => label.toArray().length > 0);

  // const icon = children(() => local.icon);
  const hasIcon = () => !!local.icon;

  const [state, setState] = createSignal<AnimationState>();

  createEffect<boolean>(
    (prevSelected) => {
      const nextSelected = local.selected;

      if(!prevSelected && nextSelected) {
        setState("selecting");
      } else if(prevSelected && !nextSelected) {
        setState("deselecting");
      } else setState();

      return nextSelected;
    },
    local.selected,
  );

  return (
    <button
      ref={mergeRefs(element => ref = element, local.ref)}
      class={
        buttonSegmentStyle({
          selected: local.selected,
          state: state(),
          disabled: local.disabled,
        })
      }
      disabled={local.disabled}
      aria-pressed={local.selected}
      {...others}>
        <Focus for={ref} />
        <Ripple for={ref} disabled={local.disabled} />

        <div class={
          buttonSegmentOutlineStyle({
            disabled: local.disabled,
          })
        } />
        <span class={buttonSegmentLeadingStyle} aria-hidden="true">
          <span class={buttonSegmentGraphicStyle({
            withLabel: hasLabel(),
            selected: local.selected,
          })}>
            <ButtonSegmentCheckmark
              selected={local.selected}
              state={state()}
              disabled={local.disabled} />
            <span
              class={
                buttonSegmentIconStyle({
                  state: state(),
                })
              }
              aria-hidden="true">
                <MaterialSymbolController
                  class={buttonSegmentMaterialSymbolStyle}
                  children={local.icon} />
            </span>
          </span>
        </span>
        {label()}
        <span class={buttonSegmentTouchStyle} />
    </button>
  );
}

type ButtonSegmentCheckmarkProps = {
  selected: boolean;
  state?: AnimationState;
  disabled: boolean;
}
const ButtonSegmentCheckmark: Component<ButtonSegmentCheckmarkProps> = (props) => {
  return (
    <svg
      class={buttonSegmentCheckmarkStyle({ selected: props.selected })}
      viewBox="0 0 24 24">
        <path
          class={
            buttonSegmentCheckmarkPathStyle({
              state: props.state,
              disabled: props.disabled,
            })
          }
          fill="none"
          d="M1.73,12.91 8.1,19.28 22.79,4.59" // standard
          // d="M5.275,12.2875 9.55,16.6388 18.725,7.3875" // 24opsz
          // d="M6.1625,12.4875 9.7387,16.0637 17.8424,7.9346" // 20opsz
          />
    </svg>
  );
}
