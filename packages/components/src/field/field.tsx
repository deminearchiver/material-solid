import { type JSX, type Component, splitProps, type ParentComponent, Show, mergeProps, createSignal, type FlowComponent, createMemo, createEffect, on } from "solid-js";

import type { Override } from "@material-solid/utils/types";
import { styles } from "./field.css";
import { mergeRefs } from "@solid-primitives/refs";
import { clsx } from "@material-solid/utils/clsx";
import type { Ref } from "@material-solid/utils/refs";
import { getVarName } from "@material-solid/utils/vanilla-extract";
import { THEME } from "@material-solid/vanilla-extract/contract";

type ResolvableProps<
  Resolved extends boolean = false,
  SharedProps = {},
  UnresolvedProps = {},
  ResolvedProps = {},
> = Resolved extends true
  ? Override<SharedProps, ResolvedProps>
  : Override<SharedProps, UnresolvedProps>;

export namespace Field {
  export type Props<Resolved extends boolean = false> =
    & ProtectedProps<Resolved>
    & PublicProps<Resolved>;

  export type ProtectedProps<Resolved extends boolean = false> = {
    background?: JSX.Element;
    stateLayer?: JSX.Element;
    outline?: JSX.Element;
    indicator?: JSX.Element;
  }

  export type PublicProps<
    Resolved extends boolean = false
  > = ResolvableProps<
    Resolved,
    & Omit<
      JSX.HTMLAttributes<HTMLElement>,
      "ref" |"children"
    >
    & {
      ref?: Ref<Element>;
      container?: JSX.Element;
      start?: JSX.Element;
      end?: JSX.Element;
      content?: JSX.Element;
    },
    {
      focused?: boolean;
      label?: string;
      disabled?: boolean;
      required?: boolean;
      populated?: boolean;
      supportingText?: string;
    },
    {
      focused: boolean;
      label: string;
      disabled: boolean;
      required: boolean;
      populated: boolean;
      supportingText: string;
    }
  >;

  export interface Element extends HTMLElement {}
}


export const Field = <
  Resolved extends boolean = false
>(
  props: Field.Props<Resolved>,
) => {
  const mergedProps = mergeProps(
    {
      disabled: false,
      focused: false,
      label: "",
      supportingText: "",
      required: false,
    } as Field.Props<true>,
    props,
  ) as Field.Props<true>;

  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "class",

      "container",
      "start",
      "end",
      "disabled",
      "indicator",
      "outline",
      "stateLayer",
      "background",
      "content",
      "label",
      "focused",
      "required",
      "populated",
      "supportingText",
    ],
  );

  let ref!: HTMLElement;

  let restingLabelRef!: HTMLElement;
  let floatingLabelRef!: HTMLElement;

  let labelAnimation: Animation;

  // https://github.com/material-components/material-web/blob/c27bdee0277326b7e88876e266ea463d92aa67d5/field/internal/field.ts#L305
  const getLabelKeyframes = (): Keyframe[] => {
    const {
      x: floatingX,
      y: floatingY,
      height: floatingHeight,
    } = floatingLabelRef.getBoundingClientRect();
    const {
      x: restingX,
      y: restingY,
      height: restingHeight,
    } = restingLabelRef.getBoundingClientRect();

    const floatingScrollWidth = floatingLabelRef.scrollWidth;
    const restingScrollWidth = restingLabelRef.scrollWidth;

    // Scale by width ratio instead of font size since letter-spacing will scale
    // incorrectly. Using the width we can better approximate the adjusted
    // scale and compensate for tracking and overflow.
    // (use scrollWidth instead of width to account for clipped labels)
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;

    // The line-height of the resting and floating label are different. When
    // we move the floating label down to the resting label's position, it won't
    // exactly match because of this. We need to adjust by half of what the
    // final scaled floating label's height will be.
    const yDelta =
      restingY -
      floatingY +
      Math.round((restingHeight - floatingHeight * scale) / 2);

    // Create the two transforms: floating to resting (using the calculations
    // above), and resting to floating (re-setting the transform to initial
    // values).
    const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;

    // Constrain the floating labels width to a scaled percentage of the
    // resting label's width. This will prevent long clipped labels from
    // overflowing the container.
    const restingClientWidth = restingLabelRef.clientWidth;
    const isRestingClipped = restingScrollWidth > restingClientWidth;
    const width = isRestingClipped ? `${restingClientWidth / scale}px` : "";
    if (local.focused || local.populated) {
      return [
        {transform: restTransform, width},
        {transform: floatTransform, width},
      ];
    }

    return [
      {transform: floatTransform, width},
      {transform: restTransform, width},
    ];
  }

  const [isAnimating, setIsAnimating] = createSignal(false);

  // https://github.com/material-components/material-web/blob/c27bdee0277326b7e88876e266ea463d92aa67d5/field/internal/field.ts#L260
  const animateLabelIfNeeded = (
    wasFocused: boolean = local.focused,
    wasPopulated: boolean = local.populated,
  ) => {
    if(!local.label) return;

    const wasFloating = wasFocused || wasPopulated;
    const shouldBeFloating = local.focused || local.populated;
    if(wasFloating === shouldBeFloating) return;

    setIsAnimating(true);
    labelAnimation?.cancel();

    const style = getComputedStyle(ref);
    const easing = style.getPropertyValue(
      getVarName(THEME.easing.standard),
    );

    labelAnimation = floatingLabelRef.animate(
      getLabelKeyframes(),
      { duration: 150, easing }
    );
    labelAnimation.addEventListener("finish", () => {
      setIsAnimating(false);
    });
  }

  const labelText = createMemo(
    () => `${local.label}${
      local.required ? "*" : ""
    }`
  );

  const [disableTransitions, setDisableTransitions] = createSignal(false);
  createEffect(
    on(
      () => local.disabled,
      (disabled, wasDisabled = disabled) => {
        if(disabled === wasDisabled) return;

        setDisableTransitions(true);

        requestAnimationFrame(() => {
          setDisableTransitions(false);
        });
      }
    ),
  );

  createEffect(
    on(
      [() => local.focused, () => local.populated],
      ([focused, populated], previous) => {
        const [wasFocused, wasPopulated] = previous ?? [focused, populated];
        animateLabelIfNeeded(wasFocused, wasPopulated);
      },
    ),
  );

  return (
    <div
      ref={mergeRefs(element => ref = element, local.ref)}
      class={clsx(
        styles.field({
          disabled: local.disabled,
        }),
        local.class,
      )}
      {...others}>
        <div
          class={
            styles.containerOverflow({

            })
          }>
            {local.background}
            {local.stateLayer}
            {local.indicator}
            {local.outline}
            <div
              class={
                styles.container({})
              }>
                <div>
                  {local.start}
                </div>
                <div class="middle">
                  <div class={
                    styles.labelWrapper({})
                  }>
                    <Show when={local.label}>
                      <Label
                        ref={restingLabelRef}
                        type="resting"
                        visible={!local.focused && !local.populated && !isAnimating()}
                        disabled={local.disabled}
                        focused={local.focused}
                        text={labelText()} />
                    </Show>
                    <Show when={local.label && !local.outline}>
                      <Label
                        ref={floatingLabelRef}
                        type="floating"
                        visible={local.focused || local.populated || isAnimating()}
                        disabled={local.disabled}
                        focused={local.focused}
                        text={labelText()} />
                    </Show>
                  </div>
                  <div
                    class={
                      styles.content({
                        disabled: local.disabled,
                        focused: local.focused,
                        populated: local.populated,
                        disableTransitions: disableTransitions(),
                      })
                    }
                    children={local.content} />
                </div>
                <div>
                  {local.end}
                </div>
            </div>
        </div>
        <div
          class={
            styles.supportingText({
              disabled: local.disabled,
            })
          }
          role="alert" // TODO: only if shouldErrorAnnounce is true
        >
            {local.supportingText}
        </div>
    </div>
  );

}


type LabelProps = {
  ref: Ref<HTMLElement>;
  type: "resting" | "floating";
  visible: boolean;
  disabled: boolean;
  focused: boolean;
  text: string;
}

const Label: Component<LabelProps> = (props) => {
  const [, local] = splitProps(props, []);
  return (
    <span
      ref={local.ref}
      class={
        styles.label({
          type: local.type,
          hidden: !local.visible,
          disabled: local.disabled,
          focused: local.focused,
        })
      }
      aria-hidden={!local.visible}
      children={props.text} />
  )
}
