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

type Direction = "left" | "right";

export type AnimationState = {
  flightInProgress: boolean;
}

// const TabBarBase: FlowComponent<TabBarBaseProps> = (props) => {
//   const [local, others] = splitProps(props, [
//     "variant",
//     "onPositionChanged",
//     "position",
//     "children",
//   ]);


//   const tokens = resolveTokens(TabToken, () => local.children);

//   let ref!: HTMLElement;


//   let indicatorRef!: HTMLElement;
//   let shuttleRef!: HTMLElement;

//   const [flight, setFlight] = createSignal(false);
//   const [force, setForce] = createSignal(false);

//   const mount = createMemo(() => force() || !flight());

//   const [position, setPosition] = createSignal(local.position);
//   const isActive = createSelector(position);

//   const [animation, setAnimation] = createSignal<Animation>();
//   function onFinish(this: Animation) {
//     if(this === animation()) {
//       setFlight(false);
//       setAnimation();
//     }
//   }

//   createEffect(on(
//     () => local.position,
//     async (nextPosition, prevPosition) => {
//       prevPosition ??= nextPosition;

//       const direction: Direction = nextPosition > prevPosition ? "right" : "left";

//       setForce(true);
//       const [prevRect, nextRect] = await new Promise<DOMRect[]>(
//         resolve => {
//           queueMicrotask(() => {
//             const prevRect = indicatorRef.getBoundingClientRect();
//             setPosition(nextPosition);
//             queueMicrotask(() => {
//               const nextRect = indicatorRef.getBoundingClientRect();
//               resolve([prevRect, nextRect]);
//             });
//           });
//         },
//       );

//       setForce(false);

//       const tabBarRect = ref.getBoundingClientRect();
//       const prevLeft = prevRect.left - tabBarRect.left;
//       const prevRight = tabBarRect.width - (prevLeft + prevRect.width);

//       const nextLeft = nextRect.left - tabBarRect.left;
//       const nextRight = tabBarRect.width - (nextLeft + nextRect.width);

//       setFlight(true);

//       animation()?.removeEventListener("finish", onFinish);

//       const leftKeyframes = { left: [`${prevLeft}px`, `${nextLeft}px`] };
//       const rightKeyframes = { right: [`${prevRight}px`, `${nextRight}px`] };

//       const easing = getComputedStyle(document.documentElement)
//         .getPropertyValue(getVarName(THEME.easing.emphasized));
//       const fill = "both";
//       const duration = 600;
//       const delay = local.variant === "primary" ? 50 : 0;

//       if(delay > 0) shuttleRef.animate(
//         nextPosition > prevPosition ? rightKeyframes : leftKeyframes,
//         { duration, fill, easing },
//       );
//       const nextAnimation = shuttleRef.animate(
//         delay > 0
//           ? nextPosition > prevPosition ? leftKeyframes : rightKeyframes
//           : { ...leftKeyframes, ...rightKeyframes },
//         {
//           delay,
//           duration: duration - delay,
//           fill, easing,
//         },
//       );
//       setAnimation(nextAnimation);
//       nextAnimation.addEventListener("finish", onFinish, { once: true });

//       return nextPosition;
//     },
//   ));

//   return (
//     <div
//       ref={ref as HTMLDivElement}
//       class={tabBarStyle}
//       role="tablist">
//         <TabBarContext.Provider
//           value={{
//             variant: () => local.variant,
//           }}>
//             <Show when={flight()}>
//               <TabIndicator
//                 ref={shuttleRef}
//                 variant={local.variant} />
//             </Show>
//             <For each={tokens()}>
//               {({ data: tab }, index) => (
//                 <Tab
//                   onClick={() => local.onPositionChanged?.(index())}
//                   active={isActive(index())}>
//                     {tab.icon}
//                     {tab.label}
//                     <Show when={mount() && isActive(index())}>
//                       <TabIndicator
//                         ref={indicatorRef}
//                         variant={local.variant} />
//                     </Show>
//                 </Tab>
//               )}
//             </For>
//         </TabBarContext.Provider>
//     </div>
//   );
// };


type IndicatorAnimation = {
  from: DOMRect;
  to: DOMRect;
  animation: Animation;
}


type IndicatorPosition = {
  from: DOMRect;
  to: DOMRect;
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

  const isActive = createSelector(() => local.position);
  const [refs, setRefs] = createStore<TabElement[]>([]);

  // const [animations, setAnimations] = createStore<IndicatorAnimation[]>([]);


  const globalToLocal = (parent: DOMRect, child: DOMRect): DOMRect => {
    return new DOMRect(
      child.x - parent.x,
      child.y - parent.y,
      child.width,
      child.height,
    );
  }
  const animations = new Map<Animation, IndicatorPosition>();

  function onFinish(this: Animation) {
    animations.delete(this);
  }

  createEffect(on(
    () => local.position,
    (nextPosition, prevPosition) => {
      const isFirst = prevPosition === undefined;
      if(isFirst) return;

      const prevTab = refs[prevPosition];
      const nextTab = refs[nextPosition];

      const prevRect = prevTab.getContentRect();
      const nextRect = nextTab.getContentRect();

      const relativeRect = globalToLocal(nextRect, prevRect);

      const left = relativeRect.left;
      const right = nextRect.width - relativeRect.right;

      const easing = getComputedStyle(document.documentElement)
        .getPropertyValue(getVarName(THEME.easing.emphasized));

      const nextAnimation = indicatorRef.animate(
        {
          left: [`${left}px`, "0px"],
          right: [`${right}px`, "0px"],
        },
        {
          easing,
          duration: 600,
          fill: "forwards",
          composite: "accumulate",
        }
      );

      const adjustedAnimations = [...animations.entries()].map(
        ([oldAnimation, { from, to }]) => {
          const relativeFrom = globalToLocal(nextRect, from);
          const relativeTo = globalToLocal(nextRect, to);

          const prevLeft = relativeFrom.left - left;
          const prevRight = nextRect.width - relativeFrom.right - right;

          const nextLeft = relativeTo.left - left;
          const nextRight = nextRect.width - relativeTo.right - right;

          const newAnimation = indicatorRef.animate(
            {
              left: [`${prevLeft}px`, `${nextLeft}px`],
              right: [`${prevRight}px`, `${nextRight}px`],
            },
            {
              easing,
              duration: 600,
              fill: "forwards",
              composite: "accumulate",
            },
          );

          newAnimation.startTime = oldAnimation.startTime;
          newAnimation.currentTime = oldAnimation.currentTime;

          oldAnimation.removeEventListener("finish", onFinish);
          oldAnimation.cancel();
          newAnimation.addEventListener("finish", onFinish);

          // newAnimation.play();

          return [newAnimation, { from, to }] as const;
        }
      );
      animations.clear();
      adjustedAnimations.forEach(([key, value]) => animations.set(key, value));

      nextAnimation.addEventListener("finish", onFinish);
      animations.set(
        nextAnimation,
        { from: prevRect, to: nextRect },
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
