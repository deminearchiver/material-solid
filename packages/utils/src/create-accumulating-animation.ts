import { createSignal } from "solid-js";

import { createStaticStore } from "@solid-primitives/static-store";

export type AccumulatingAnimationOptions =
  & Omit<
    KeyframeAnimationOptions,
    "duration"
  >
  & {
    duration: number;
  };
export interface AccumulatingAnimationAnimate {
  (
    target: Animatable,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    duration: number,
  ): void;
  (
    target: Animatable,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: AccumulatingAnimationOptions,
  ): void;
}

export type AccumulatingAnimation = AccumulatingAnimationAnimate

export type CreateAccumulatingAnimationOptions =
  // & KeyframeAnimationOptions
  & {
    onBeforeStart?: () => void;
    onAfterEnd?: () => void;
  };

type AccumulatingAnimationState = {
  animation?: Animation;
  duration: number;
}

export const createAccumulatingAnimation = (defaults: CreateAccumulatingAnimationOptions = {}): AccumulatingAnimation => {
  // const [prevDuration, setPrevDuration] = createSignal<number>(0);
  // const [animation, setAnimation] = createSignal<Animation>();

  const [state, setState] = createStaticStore<
    AccumulatingAnimationState
  >({
    duration: 0,
  });

  function finishListener(this: Animation) {
    if(this === state.animation) {
      setState("animation", undefined);
      defaults.onAfterEnd?.();
    }
  }


  return (target, keyframes, options) => {
    defaults.onBeforeStart?.();

    const resolvedOptions: AccumulatingAnimationOptions = typeof options === "number"
      ? { duration: options }
      : options ?? {};

    const nextDuration = resolvedOptions.duration + (resolvedOptions.delay ?? 0) + (resolvedOptions.endDelay ?? 0);

    state.animation?.removeEventListener("finish", finishListener);
    const nextAnimation = target.animate(
      keyframes,
      resolvedOptions,
    );
    if(nextDuration >= state.duration) {
      setState("duration", nextDuration);

      nextAnimation.addEventListener("finish", finishListener);
      setState("animation", nextAnimation);
    } else {
      state.animation?.addEventListener("finish", finishListener);
    }
  };
}
