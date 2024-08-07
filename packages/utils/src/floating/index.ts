import {
  arrow,
  autoPlacement,
  type AutoPlacementOptions,
  autoUpdate,
  computePosition,
  type DetectOverflowOptions,
  flip,
  type FlipOptions,
  hide,
  type HideOptions,
  inline,
  type InlineOptions,
  type Middleware,
  offset,
  type OffsetOptions,
  type Padding,
  type Placement,
  shift,
  type ShiftOptions,
  size,
  type Strategy,
} from "@floating-ui/dom";
import { access, type MaybeAccessor } from "@solid-primitives/utils";
import { createSignal, mergeProps, onCleanup } from "solid-js";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export type FloatingOptions = {
  offset?: OffsetOptions;
  shift?: boolean | ShiftOptions;
  flip?: boolean | FlipOptions;
  arrow?: Padding;
  size?: DetectOverflowOptions & {
    matchSize?: boolean;
    fitViewPort?: boolean;
  };
  autoPlacement?: boolean | AutoPlacementOptions;
  hide?: boolean | HideOptions;
  inline?: boolean | InlineOptions;
};

export type FloatingState = {
  placement: Placement;
  x: number;
  y: number;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  arrowX?: number;
  arrowY?: number;
};

type FloatingProps = {
  enabled?: MaybeAccessor<boolean>;
  reference: MaybeAccessor<HTMLElement | undefined>;
  floating: MaybeAccessor<HTMLElement | undefined>;
  arrow?: MaybeAccessor<HTMLElement | undefined>;
  placement?: MaybeAccessor<Placement>;
  strategy?: MaybeAccessor<Strategy>;
  options?: MaybeAccessor<FloatingOptions | undefined>;
};

export const createFloating = (props: FloatingProps): FloatingState => {
  const defaultedProps = mergeProps(
    {
      enabled: true,
      placement: "bottom" as const,
      strategy: "absolute" as const,
    },
    props
  );

  const [floatingState, setFloatingState] = createStore<FloatingState>({
    placement: access(defaultedProps.placement),
    x: 0,
    y: 0,
  });

  createEffect(() => {
    if (!access(defaultedProps.enabled)) return;

    const reference = access(defaultedProps.reference);
    const floating = access(defaultedProps.floating);
    if (!reference || !floating) return;

    const middleware: Middleware[] = [];
    const options = access(defaultedProps.options);

    if (options?.offset !== undefined) {
      middleware.push(offset(options.offset));
    }
    if (options?.shift !== undefined && options.shift !== false) {
      const shiftOptions = options.shift === true ? undefined : options.shift;
      middleware.push(shift(shiftOptions));
    }
    const arrowElement = access(defaultedProps.arrow);
    if (arrowElement) {
      middleware.push(
        arrow({
          element: arrowElement,
          padding: options?.arrow,
        })
      );
    }

    const flipEnabled = options?.flip !== undefined && options.flip !== false;
    const flipOptions =
      typeof options?.flip === "boolean" ? undefined : options?.flip;

    if (flipEnabled && flipOptions?.fallbackStrategy !== "initialPlacement") {
      middleware.push(flip(flipOptions));
    }

    if (options?.size) {
      middleware.push(
        size({
          apply: ({ availableWidth, availableHeight, ...state }) => {
            const newFloatingState: Partial<FloatingState> = {};

            if (options.size!.matchSize === true) {
              if (
                state.placement.startsWith("top") ||
                state.placement.startsWith("bottom")
              ) {
                newFloatingState.width = state.rects.reference.width;
              } else {
                newFloatingState.height = state.rects.reference.height;
              }
            }
            if (options.size!.fitViewPort === true) {
              if (
                state.placement.startsWith("top") ||
                state.placement.startsWith("bottom")
              ) {
                newFloatingState.maxHeight = availableHeight;
              } else {
                newFloatingState.maxWidth = availableWidth;
              }
            }

            if (!floatingStatesMatch(floatingState, newFloatingState)) {
              setFloatingState((state) => ({ ...state, ...newFloatingState }));
            }
          },
          ...options.size,
        })
      );
    }

    if (flipEnabled && flipOptions?.fallbackStrategy === "bestFit") {
      middleware.push(flip(flipOptions));
    }

    if (
      !flipEnabled &&
      options?.autoPlacement !== undefined &&
      options.autoPlacement !== false
    ) {
      const autoPlacementOptions =
        options.autoPlacement === true ? undefined : options.autoPlacement;
      middleware.push(autoPlacement(autoPlacementOptions));
    }

    if (options?.hide !== undefined && options.hide !== false) {
      const hideOptions = options.hide === true ? undefined : options.hide;
      middleware.push(hide(hideOptions));
    }

    if (options?.inline !== undefined && options.inline !== false) {
      const inlineOptions =
        options.inline === true ? undefined : options.inline;
      middleware.push(inline(inlineOptions));
    }

    const cleanup = autoUpdate(reference, floating, () => {
      computePosition(reference, floating, {
        placement: access(defaultedProps.placement),
        strategy: access(defaultedProps.strategy),
        middleware,
      }).then(({ placement, x, y, middlewareData }) => {
        const newFloatingState = {
          placement,
          x,
          y,
          arrowX: middlewareData.arrow?.x,
          arrowY: middlewareData.arrow?.y,
        };
        if (!floatingStatesMatch(floatingState, newFloatingState)) {
          setFloatingState((state) => ({ ...state, ...newFloatingState }));
        }
      });
    });

    onCleanup(cleanup);
  });

  return floatingState;
};

const floatingStatesMatch = (a: FloatingState, b: Partial<FloatingState>) => {
  return (
    (b.placement === undefined || a.placement === b.placement) &&
    (b.x === undefined || a.x === b.x) &&
    (b.y === undefined || a.y === b.y) &&
    (b.width === undefined || a.width === b.width) &&
    (b.height === undefined || a.height === b.height) &&
    (b.maxWidth === undefined || a.maxWidth === b.maxWidth) &&
    (b.maxHeight === undefined || a.maxHeight === b.maxHeight) &&
    (b.arrowX === undefined || a.arrowX === b.arrowX) &&
    (b.arrowY === undefined || a.arrowY === b.arrowY)
  );
};
