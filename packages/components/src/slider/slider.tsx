import {
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  type JSX,
  type Component,
  type FlowComponent,
  type ParentComponent,
  Show,
  createEffect,
  on,
  onMount,
} from "solid-js";
import { setRef, type Ref, type RefCallback } from "@material-solid/utils";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createPresence } from "@solid-primitives/presence";
import { Focus } from "../focus";
import type { MaybeAccessor } from "@solid-primitives/utils";
import { createStore } from "solid-js/store";

import {
  containerStyle,
  focusStyle,
  handleIndicatorStyle,
  handleStyle,
  inputStyle,
  labelStyle,
  labelTextStyle,
  segmentFraction,
  segmentShapeStyle,
  segmentStyle,
  stopsEndInset,
  stopsStartInset,
  stopsStyle,
} from "./slider.css";

const normalize = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};

export type SliderElement = {};


export type SliderProps = {
  ref?: Ref<SliderElement>;
  /**
   * @default 0
   */
  from?: number;
  /**
   * @default 1
   */
  to?: number;
  steps?: number;
  center?: number;
  value: number;
  valueFormatter?: (value: number) => number;
  labelFormatter?: (value: number) => string;
  onChanged?: (value: number) => void;
};

type SliderState = {
  pressed: boolean;
}

export const Slider: Component<SliderProps> = (props) => {
  const mergedProps = mergeProps({ from: 0, to: 1 }, props);

  const [local, others] = splitProps(mergedProps, [
    "ref",
    "from",
    "to",
    "value",
    "valueFormatter",
    "labelFormatter",
    "onChanged",
    "steps",
  ]);

  setRef(local.ref, {});

  let containerRef!: HTMLElement;
  let inputRef!: HTMLInputElement;

  const [state, setState] = createStore<SliderState>({
    pressed: false,
  });
  const setPressed = (value: boolean) => {
    setState("pressed", value);
    showLabel(value);
  }

  const [labelVisible, setLabelVisible] = createSignal(false);
  const [labelTimeout, setLabelTimeout] = createSignal<number>();

  const fraction = createMemo(() =>
    normalize(local.value, local.from, local.to)
  );

  const value = createMemo(() => {
    return local.valueFormatter?.(local.value) ?? local.value;
  });
  const label = createMemo(() => {
    return `${local.labelFormatter?.(value()) ?? value()}`;
  });

  const showLabel = (show: boolean = true) => {
    const timeout = labelTimeout();
    if(timeout !== undefined) clearTimeout(timeout);
    if(show) setLabelVisible(true);
    setLabelTimeout(
      setTimeout(
        () => {
          if(!state.pressed) setLabelVisible(false);
        },
        400,
      ) as unknown as number, // TODO: fix NodeJS.Timeout error
    );
  }

  const onChange = (value: number) => {
    local.onChanged?.(value);
    showLabel();
  }

  return (
    <div
      ref={containerRef as HTMLDivElement}
      class={containerStyle}>
        <input
          ref={inputRef}
          class={
            inputStyle({
              pressed: state.pressed,
            })
          }
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerCancel={() => setPressed(false)}
          onFocusIn={() => {
            if(inputRef.matches(":focus-visible")) setPressed(true);
          }}
          onFocusOut={() => setPressed(false)}
          onChange={event => onChange(event.currentTarget.valueAsNumber)}
          onInput={event => onChange(event.currentTarget.valueAsNumber)}
          type="range"
          min={local.from}
          max={local.to}
          step={local.steps ?? "any"}
          aria-valuemin={local.from}
          aria-valuemax={local.to}
          aria-valuetext={`${local.value}`}
          aria-label="Slider"
        />
        {/* <SliderStops
          state={state}
          fromFraction={0}
          toFraction={fraction()}
          active /> */}
        <SliderSegment
          edge="start"
          active
          fraction={fraction()}
          state={state} />
        <SliderHandle
          for={inputRef}
          state={state}
          label={label()}
          labelVisible={labelVisible()} />
        <SliderSegment
          edge="end"
          stop
          fraction={1 - fraction()}
          state={state} />
    </div>
  );
};


type SliderStopsProps = {
  state: SliderState;
  active?: boolean;
  fromFraction: number;
  toFraction: number;
}
const SliderStops: Component<SliderStopsProps> = (props) => {
  const offset = createMemo(
    () => props.state.pressed ? 6 : 8,
  );
  const startInset = createMemo(
    () => props.fromFraction
      ? `calc(${(props.fromFraction) * 100}%)`
      : undefined
  );
  const endInset = createMemo(
    () => props.toFraction
      ? `calc(${(1 - props.toFraction) * 100}% + ${offset()}px)`
      : undefined
  );
  return (
    <div
      class={stopsStyle({
        active: props.active
      })}
      style={
        assignInlineVars({
          [stopsStartInset]: startInset(),
          [stopsEndInset]: endInset(),
        })
      }>

    </div>
  );
}

type SliderSegmentProps = {
  state: SliderState;
  fraction: number;
  edge: "start" | "end";
  active?: boolean;
  stop?: boolean;
  shapeRef?: Ref<HTMLElement>;
}
const SliderSegment: Component<SliderSegmentProps> = (props) => {
  return (
    <div
      class={segmentStyle}
      style={
        assignInlineVars({
          [segmentFraction]: `${props.fraction}`,
        })
      }>
        <div
          ref={props.shapeRef as Ref<HTMLDivElement>}
          class={
            segmentShapeStyle({
              edge: props.edge,
              active: props.active,
              pressed: props.state.pressed,
              stop: props.stop,
            })
          } />
    </div>
  )
}

type SliderHandleProps = {
  for: MaybeAccessor<HTMLElement>;
  state: SliderState;
  label: JSX.Element;
  labelVisible?: boolean;
}
const SliderHandle: Component<SliderHandleProps> = (props) => {
  return (
    <div class={handleStyle}>
      <Focus for={props.for} class={focusStyle} />
      <div class={
        handleIndicatorStyle({
          pressed: props.state.pressed
        })
      } />

      <Show when={props.label != null}>
        <div
          class={
            labelStyle({
              visible: props.labelVisible
            })
          }>
            <span
              class={
                labelTextStyle({
                  visible: props.labelVisible
                })
              }
              children={props.label} />
        </div>
      </Show>
    </div>
  );
}
