import {
  type Accessor,
  type Component,
  createComputed,
  createContext,
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
  useContext,
} from "solid-js";
import { resolveTokens } from "@solid-primitives/jsx-tokenizer";
import { TabToken, type TabTokenProps } from "./tab-token";
import { Ripple } from "../ripple";
import { mergeRefs, Ref, Refs } from "@solid-primitives/refs";
import { Focus } from "../focus";
import { createStore, produce, reconcile, unwrap } from "solid-js/store";
import {
  createElementSize,
  createResizeObserver,
  type ResizeHandler,
} from "@solid-primitives/resize-observer";
import { createStaticStore } from "@solid-primitives/static-store";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Tab, type TabElement } from "./tab";

import { until } from "@solid-primitives/promise";
import { tabBarStyle } from "./tab-bar.css";
import { TabIndicator } from "./tab-indicator";
import { THEME } from "@material-solid/vanilla-extract/contract";
import {
  getVarName,
} from "@material-solid/utils/vanilla-extract";
import { ReactiveMap } from "@solid-primitives/map";

export type TabBarVariant = "primary" | "secondary";






export type TabBarData = {
  variant: Accessor<TabBarVariant>;
  withIcons: Accessor<boolean>;
}
const TabBarContext = createContext<TabBarData>();
export const useTabBar = () => useContext(TabBarContext);


export type TabBarProps = {
  onPositionChanged?: (value: number) => void;
  position: number;
};

export type TabBarBaseProps = {
  variant: TabBarVariant;
} & TabBarProps;


type IndicatorPosition = {
  from: DOMRect;
  to: DOMRect;
}

type IndicatorAnimationDirection = "left" | "right";

type IndicatorAnimation =
  & {
    direction?: IndicatorAnimationDirection;
    at: (index: number) => Animation | undefined;
    forEach: (callback: (value: Animation, index: number) => void) => void;
  }
  & (
    | {
      direction?: undefined;
      both: Animation;
    }
    | {
      direction: IndicatorAnimationDirection;
      left: Animation;
      right: Animation;
    }
  );


const TabBarBase: FlowComponent<TabBarBaseProps> = (props) => {
  const [local, others] = splitProps(props, [
    "variant",
    "onPositionChanged",
    "position",
    "children",
  ]);

  const tokens = resolveTokens(TabToken, () => local.children);
  const isActive = createSelector(() => local.position);

  let ref!: HTMLElement;
  let indicatorRef!: HTMLElement;

  const [refs, setRefs] = createStore<TabElement[]>([]);

  const globalToLocal = (parent: DOMRect, child: DOMRect): DOMRect => {
    return new DOMRect(
      child.x - parent.x,
      child.y - parent.y,
      child.width,
      child.height,
    );
  }


  type AnimateIndicatorOptions = {
    fromLeft: number;
    fromRight: number;
    toLeft?: number;
    toRight?: number;
    direction?: "left" | "right";
    options?: Omit<KeyframeAnimationOptions, "duration">;
    onFinish?: () => void;
  };
  const animateIndicator = (
    {
      fromLeft,
      fromRight,
      toLeft = 0,
      toRight = 0,
      direction,
      options = {},
      onFinish,
    }: AnimateIndicatorOptions,
  ): IndicatorAnimation => {
    const keyframes = {
      left: [`${fromLeft}px`, `${toLeft}px`],
      right: [`${fromRight}px`, `${toRight}px`],
    };

    const longDuration = 1000;

    if(direction) {
      const shortDuration = 800;
      const left = indicatorRef.animate(
        { left: keyframes.left },
        {
          ...options,
          duration: direction === "left" ? shortDuration : longDuration,
        }
      );
      const right = indicatorRef.animate(
        { right: keyframes.right },
        {
          ...options,
          duration: direction === "right" ? shortDuration : longDuration,
        }
      );

      if(onFinish) {
        let finished = false;
        const finishListener = () => {
          if(finished) {
            onFinish?.();
          } else finished = true;
        }

        left.addEventListener("finish", finishListener);
        right.addEventListener("finish", finishListener);
      }

      return {
        direction, left, right,
        at: (index) => {
          if(index === 0) return left;
          if(index === 1) return right;
        },
        forEach: (callback) => {
          callback(left, 0);
          callback(right, 1);
        },
      }
    } else {
      const both = indicatorRef.animate(
        keyframes,
        {
          ...options,
          duration: longDuration,
        },
      );
      if(onFinish) both.addEventListener("finish", onFinish);
      return {
        both,
        at: (index) => index === 0 ? both : undefined,
        forEach: (callback) => callback(both, 0),
      };
    }
  }

  const edgeAnimations = new Map<IndicatorPosition, IndicatorAnimation>();

  createEffect(on(
    () => local.position,
    (nextIndex, prevIndex) => {
      const isFirst = prevIndex === undefined;
      if(isFirst) return;

      const direction = nextIndex > prevIndex ? "right" : "left";

      const prevTab = refs[prevIndex];
      const nextTab = refs[nextIndex];

      const prevRect = prevTab.getContentRect();
      const nextRect = nextTab.getContentRect();

      const relativeRect = globalToLocal(nextRect, prevRect);

      const left = relativeRect.left;
      const right = nextRect.width - relativeRect.right;

      const easing = getComputedStyle(document.documentElement)
        .getPropertyValue(getVarName(THEME.easing.emphasized));

      const options = {
        easing,
        fill: "none",
        composite: "accumulate",
      } satisfies KeyframeAnimationOptions;

      const nextPosition: IndicatorPosition = { from: prevRect, to: nextRect };
      const nextAnimations = animateIndicator({
        direction,
        fromLeft: left,
        fromRight: right,
        options,
        onFinish: () => {
          edgeAnimations.delete(nextPosition);
        },
      });

      edgeAnimations.forEach(
        ({ direction, at }, position) => {
          const relativeFrom = globalToLocal(nextRect, position.from);
          const relativeTo = globalToLocal(nextRect, position.to);

          const prevLeft = relativeFrom.left - left;
          const prevRight = nextRect.width - relativeFrom.right - right;

          const nextLeft = relativeTo.left - left;
          const nextRight = nextRect.width - relativeTo.right - right;

          const newAnimations = animateIndicator({
            direction: direction,
            fromLeft: prevLeft,
            fromRight: prevRight,
            toLeft: nextLeft,
            toRight: nextRight,
            options,
            onFinish: () => {
              edgeAnimations.delete(position);
            },
          });

          newAnimations.forEach(
            (newAnimation, index) => {
              const oldAnimation = at(index)!;
              newAnimation.startTime = oldAnimation.startTime;
              newAnimation.currentTime = oldAnimation.currentTime;
              oldAnimation.cancel();
            }
          );

          edgeAnimations.set(position, newAnimations);
        },
      )

      edgeAnimations.set(
        nextPosition,
        nextAnimations,
      );
    }
  ));

  return (
    <div
      ref={ref as HTMLDivElement}
      class={tabBarStyle}
      role="tablist">
        <TabBarContext.Provider
          value={{
            variant: () => local.variant,
            withIcons: () => tokens().some(token => !!token.data.icon),
          }}>
            <Refs ref={elements => setRefs(reconcile(elements as TabElement[]))}>
              <For each={tokens()}>
                {({ data: tab }, index) => (
                  <Tab
                    onClick={() => local.onPositionChanged?.(index())}
                    active={isActive(index())}>
                      {tab.icon}
                      {tab.label}
                      <Show when={isActive(index())}>
                        <TabIndicator
                          ref={indicatorRef}
                          variant={local.variant} />
                      </Show>
                  </Tab>
                )}
              </For>
            </Refs>
        </TabBarContext.Provider>
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
