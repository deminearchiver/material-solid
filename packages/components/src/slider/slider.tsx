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
  type Accessor,
  type ComponentProps,
  For,
} from "solid-js";
import { assignRef, type Ref, type RefCallback } from "@material-solid/utils";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { createPresence } from "@solid-primitives/presence";
import { Focus } from "../focus";
import { asAccessor, type MaybeAccessor } from "@solid-primitives/utils";
import { createStaticStore } from "@solid-primitives/static-store";

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
  stopsPolygon,
  stopsStyle,
  stopStyle,
} from "./slider.css";
import { createElementSize, createResizeObserver } from "@solid-primitives/resize-observer";
import { createContextProvider } from "@solid-primitives/context";
import { createStore } from "solid-js/store";
import { ReactiveSet } from "@solid-primitives/set";






type SliderState = {
  pressed: boolean;
}
type SliderStateProviderProps = {
  state: SliderState;
}
const createSliderState = () => {
  return createStore<SliderState>({
    pressed: false,
  });
}

const [
  SliderStateProvider,
  useSliderState
] = createContextProvider<
  SliderState,
  SliderStateProviderProps
>(props => props.state);




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

  assignRef(local.ref, {});

  let ref!: HTMLElement;
  let inputRef!: HTMLInputElement;

  const [state, setState] = createSliderState();

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

  const [data, setData] = createStore<{
    segments: {
      inactive: HTMLElement[];
      active: HTMLElement[];
    };
    polygons: {
      inactive: string;
      active: string;
    };
  }>({
    segments: {
      inactive: [],
      active: [],
    },
    polygons: {
      inactive: "",
      active: "",
    },
  });

  const getPolygon = (segments: HTMLElement[]): string => {
    const containerRect = ref.getBoundingClientRect();

    return segments.reduce<string[]>(
      (polygon, segment) => {
        const segmentRect = segment.children.item(0)!.getBoundingClientRect();
        const left = segmentRect.left - containerRect.left;
        const right = segmentRect.right - containerRect.left;


        const next = [
          `${left}px 0%`,
          `${left}px 100%`,
          `${right}px 100%`,
          `${right}px 0%`,
        ];

        polygon.push(...next);
        return polygon;
      },
      [],
    ).join(",");
  }

  createResizeObserver(
    () => data.segments.inactive,
    (rect, element, entry) => {
      setData(
        "polygons",
        "inactive",
        getPolygon(data.segments.inactive),
      );
    },
  );
  createResizeObserver(
    () => data.segments.active,
    (rect, element, entry) => {
      setData(
        "polygons",
        "active",
        getPolygon(data.segments.active),
      );
    },
  );

  return (
    <div
      ref={ref as HTMLDivElement}
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
        <SliderStateProvider state={state}>
          <SliderSegment
            ref={element => setData("segments", "inactive", 0, element)}
            active
            edge="start"
            fraction={fraction()} />
          <SliderHandle
            for={inputRef}
            label={label()}
            labelVisible={labelVisible()} />
          <SliderSegment
            ref={element => setData("segments", "active", 0, element)}
            edge="end"
            fraction={1 - fraction()} />
      </SliderStateProvider>
    </div>
  );
};


type SliderStopsProps = {
  active?: boolean;
  polygon: string;
}
const SliderStops: Component<SliderStopsProps> = (props) => {
  const state = useSliderState()!;

  const mergedProps = mergeProps(
    { active: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    ["active", "polygon"],
  );

  return (
    <div
      class={stopsStyle()}
      style={
        assignInlineVars({
          [stopsPolygon]: local.polygon,
        })
      }>
        <For each={new Array(10).fill(true)}>{
          (item, index) => (
            <div class={stopStyle({ active: local.active })} />
          )
        }</For>
    </div>
  );
}

type SliderSegmentProps =
  & {
    fraction: number;
    edge?: "start" | "end";
    active?: boolean;
    stop?: boolean;
  }
  & JSX.HTMLAttributes<HTMLElement>;

const SliderSegment: Component<SliderSegmentProps> = (props) => {
  const mergedProps = mergeProps(
    { active: false, stop: false },
    props,
  );
  const [local, others] = splitProps(
    mergedProps,
    [
      "ref",
      "fraction",
      "edge",
      "active",
      "stop",
    ],
  );

  const state = useSliderState()!;

  return (
    <div
      ref={local.ref as Ref<HTMLDivElement>}
      class={segmentStyle}
      style={
        assignInlineVars({
          [segmentFraction]: `${props.fraction}`,
        })
      }
      {...others}>
        <div
          class={
            segmentShapeStyle({
              edge: props.edge,
              active: props.active,
              pressed: state.pressed,
              stop: props.stop,
            })
          } />
    </div>
  )
}

type SliderHandleProps = {
  for: MaybeAccessor<HTMLElement>;
  label: JSX.Element;
  labelVisible?: boolean;
}
const SliderHandle: Component<SliderHandleProps> = (props) => {
  const state = useSliderState()!;

  return (
    <div class={handleStyle}>
      <Focus for={props.for} class={focusStyle} />
      <div class={
        handleIndicatorStyle({
          pressed: state.pressed
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
