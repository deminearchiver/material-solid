import {
  type Component,
  createComputed,
  createEffect,
  createMemo,
  createRenderEffect,
  createRoot,
  createSelector,
  createSignal,
  type FlowComponent,
  For,
  getOwner,
  type JSX,
  on,
  onCleanup,
  onMount,
  Show,
  type Signal,
  splitProps,
  untrack,
} from "solid-js";
import { resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { TabToken, type TabTokenProps } from "./tab-token";
import { Ripple } from "../ripple";
import { mergeRefs, Refs } from "@solid-primitives/refs";
import { Focus } from "../focus";
import { createStore, produce } from "solid-js/store";
import {
  createElementSize,
  createResizeObserver,
  type ResizeHandler,
} from "@solid-primitives/resize-observer";
import { createStaticStore } from "@solid-primitives/static-store";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Tab } from "./tab";

import { until } from "@solid-primitives/promise";
import { tabBarStyle } from "./tab-bar.css";
import { TabIndicator } from "./tab-indicator";
import { THEME } from "@material-solid/vanilla-extract/contract";
import {
  createAccumulatingAnimation,
  getVarName,
} from "@material-solid/utils";

export type TabBarVariant = "primary" | "secondary";

export type TabBarProps = {
  onPositionChanged?: (value: number) => void;
  position: number;
};

export type TabBarBaseProps = {
  variant: TabBarVariant;
} & TabBarProps;

type Direction = "left" | "right";

export type AnimationState = {
  flightInProgress: boolean;
}

const TabBarBase: FlowComponent<TabBarBaseProps> = (props) => {
  const [local, others] = splitProps(props, [
    "variant",
    "onPositionChanged",
    "position",
    "children",
  ]);


  const tokens = resolveTokens(TabToken, () => local.children);

  let ref!: HTMLElement;


  let indicatorRef!: HTMLElement;
  let shuttleRef!: HTMLElement;

  const [flight, setFlight] = createSignal(false);
  const [force, setForce] = createSignal(false);

  const mount = createMemo(() => force() || !flight());

  const [position, setPosition] = createSignal(local.position);
  const isActive = createSelector(position);

  const [animation, setAnimation] = createSignal<Animation>();
  function onFinish(this: Animation) {
    if(this === animation()) {
      setFlight(false);
      setAnimation();
    }
  }

  createEffect(on(
    () => local.position,
    async (nextPosition, prevPosition) => {
      prevPosition ??= nextPosition;

      const direction: Direction = nextPosition > prevPosition ? "right" : "left";

      setForce(true);
      const [prevRect, nextRect] = await new Promise<DOMRect[]>(
        resolve => {
          queueMicrotask(() => {
            const prevRect = indicatorRef.getBoundingClientRect();
            setPosition(nextPosition);
            queueMicrotask(() => {
              const nextRect = indicatorRef.getBoundingClientRect();
              resolve([prevRect, nextRect]);
            });
          });
        },
      );

      setForce(false);

      const tabBarRect = ref.getBoundingClientRect();
      const prevLeft = prevRect.left - tabBarRect.left;
      const prevRight = tabBarRect.width - (prevLeft + prevRect.width);

      const nextLeft = nextRect.left - tabBarRect.left;
      const nextRight = tabBarRect.width - (nextLeft + nextRect.width);

      setFlight(true);

      animation()?.removeEventListener("finish", onFinish);

      const leftKeyframes = { left: [`${prevLeft}px`, `${nextLeft}px`] };
      const rightKeyframes = { right: [`${prevRight}px`, `${nextRight}px`] };

      const easing = getComputedStyle(document.documentElement)
        .getPropertyValue(getVarName(THEME.easing.emphasized));
      const fill = "both";
      const duration = 600;
      const delay = local.variant === "primary" ? 50 : 0;

      if(delay > 0) shuttleRef.animate(
        nextPosition > prevPosition ? rightKeyframes : leftKeyframes,
        { duration, fill, easing },
      );
      const nextAnimation = shuttleRef.animate(
        delay > 0
          ? nextPosition > prevPosition ? leftKeyframes : rightKeyframes
          : { ...leftKeyframes, ...rightKeyframes },
        {
          delay,
          duration: duration - delay,
          fill, easing,
        },
      );
      setAnimation(nextAnimation);
      nextAnimation.addEventListener("finish", onFinish, { once: true });

      return nextPosition;
    },
  ));

  return (
    <div
      ref={ref as HTMLDivElement}
      class={tabBarStyle}
      role="tablist">
        <Show when={flight()}>
          <TabIndicator
            ref={shuttleRef}
            variant={local.variant} />
        </Show>
        <For each={tokens()}>
          {({ data: tab }, index) => (
            <Tab
              onClick={() => local.onPositionChanged?.(index())}
              variant={local.variant}
              active={isActive(index())}
              {...tab}>
                <Show when={mount() && isActive(index())}>
                  <TabIndicator
                    ref={indicatorRef}
                    variant={local.variant} />
                </Show>
            </Tab>
          )}
        </For>
    </div>
  );
};

const tabBarFactory = (variant: TabBarVariant) => {
  const component: FlowComponent<TabBarProps> = (props) => {
    return <TabBarBase variant={variant} {...props} />;
  };
  return component;
};

export const TabBar = {
  primary: tabBarFactory("primary"),
  secondary: tabBarFactory("secondary"),
};
