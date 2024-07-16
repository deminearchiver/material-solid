import {
  children,
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  For,
  getOwner,
  mergeProps,
  runWithOwner,
  splitProps,
  type Accessor,
  type ChildrenReturn,
  type Component,
  type FlowComponent,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { isToken, resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { ButtonSegmentToken, type ButtonSegmentData } from "./button-segment";
import { Ripple } from "../ripple";
import { Focus } from "../focus";
import {
  mergeRefs,
  resolveElements,
  resolveFirst,
} from "@solid-primitives/refs";
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

import clsx from "clsx/lite";
import { createContextProvider } from "@solid-primitives/context";
import { asAccessor } from "@solid-primitives/utils";

type SegmentedButtonInternalsProps = {
  disabled: boolean;
};
type SegmentedButtonInternals = {
  disabled: Accessor<boolean>;
};

const [SegmentedButtonInternalsProvider, useSegmentedButtonInternals] =
  createContextProvider<
    SegmentedButtonInternals,
    SegmentedButtonInternalsProps
  >((props) => ({
    disabled: asAccessor(props.disabled),
  }));

export type SegmentedButtonProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  "role" | "children"
> & {
  disabled?: boolean;
  children: JSX.Element;
};

export const SegmentedButtonGroup: Component<SegmentedButtonProps> = (
  props
) => {
  const mergedProps = mergeProps({ disabled: false }, props);
  const [local, others] = splitProps(mergedProps, [
    "class",
    "disabled",
    "children",
  ]);

  return (
    <span
      class={clsx(segmentedButtonStyle, local.class)}
      role="group"
      {...others}
    >
      <SegmentedButtonInternalsProvider
        disabled={local.disabled}
        children={local.children}
      />
    </span>
  );
};

type ButtonSegmentAnimationState = "selecting" | "deselecting";

export type ButtonSegmentButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "disabled" | "children"
> & {
  selected: boolean;
  icon?: JSX.Element;
  label?: JSX.Element;
};

export const ButtonSegmentButton: Component<ButtonSegmentButtonProps> = (
  props
) => {
  const [local, others] = splitProps(props, [
    "ref",
    "selected",
    "icon",
    "label",
  ]);

  const { disabled } = useSegmentedButtonInternals()!;

  let ref!: HTMLButtonElement;

  const label = children(() => local.label);
  const hasLabel = createMemo(() => label.toArray().length > 0);

  // const icon = children(() => local.icon);
  // const hasIcon = () => !!local.icon;

  const [state, setState] = createSignal<ButtonSegmentAnimationState>();

  createEffect<boolean>((prevSelected) => {
    const nextSelected = local.selected;

    if (!prevSelected && nextSelected) {
      setState("selecting");
    } else if (prevSelected && !nextSelected) {
      setState("deselecting");
    } else setState();

    return nextSelected;
  }, local.selected);

  return (
    <button
      ref={mergeRefs((element) => (ref = element), local.ref)}
      class={buttonSegmentStyle({
        selected: local.selected,
        state: state(),
        disabled: disabled(),
      })}
      disabled={disabled()}
      aria-current={local.selected}
      {...others}
    >
      <Focus for={ref} />
      <Ripple for={ref} disabled={disabled()} />

      <div
        class={buttonSegmentOutlineStyle({
          disabled: disabled(),
        })}
      />
      <span class={buttonSegmentLeadingStyle} aria-hidden="true">
        <span
          class={buttonSegmentGraphicStyle({
            withLabel: hasLabel(),
            selected: local.selected,
          })}
        >
          <ButtonSegmentCheckmark
            selected={local.selected}
            state={state()}
            disabled={disabled()}
          />
          <span
            class={buttonSegmentIconStyle({
              state: state(),
            })}
            aria-hidden="true"
          >
            <MaterialSymbolController
              class={buttonSegmentMaterialSymbolStyle}
              children={local.icon}
            />
          </span>
        </span>
      </span>
      {label()}
      <span class={buttonSegmentTouchStyle} />
    </button>
  );
};

type ButtonSegmentCheckmarkProps = {
  selected: boolean;
  state?: ButtonSegmentAnimationState;
  disabled: boolean;
};
const ButtonSegmentCheckmark: Component<ButtonSegmentCheckmarkProps> = (
  props
) => {
  return (
    <svg
      class={buttonSegmentCheckmarkStyle({ selected: props.selected })}
      viewBox="0 0 24 24"
    >
      <path
        class={buttonSegmentCheckmarkPathStyle({
          state: props.state,
          disabled: props.disabled,
        })}
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59" // standard
        // d="M5.275,12.2875 9.55,16.6388 18.725,7.3875" // 24opsz
        // d="M6.1625,12.4875 9.7387,16.0637 17.8424,7.9346" // 20opsz
      />
    </svg>
  );
};
