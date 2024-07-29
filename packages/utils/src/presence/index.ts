import { createMemo, type Accessor } from "solid-js";
import { createPresence as createPresenceBase } from "@solid-primitives/presence";
import { access, accessArray, asAccessor, type MaybeAccessor } from "@solid-primitives/utils";

export type PresenceState = "entering" | "exiting";
type Presence = {
  isMounted: Accessor<boolean>;
  isVisible: Accessor<boolean>;
  isAnimating: Accessor<boolean>;
  isEntering: Accessor<boolean>;
  isExiting: Accessor<boolean>;
  state: Accessor<PresenceState | undefined>;
}

export const createPresence = <T>(
  item: Accessor<T | undefined>,
  duration: MaybeAccessor<number> | [enter: MaybeAccessor<number>, exit: MaybeAccessor<number>],
): Presence => {
  const enterDuration = () => {
    return Array.isArray(duration)
      ? access(duration[0])
      : access(duration);
  };
  const exitDuration = () => {
    return Array.isArray(duration)
      ? access(duration[1])
      : access(duration);
  };

  const {
    isMounted,
    isAnimating,
    isExiting,
    isEntering,
    isVisible,
  } = createPresenceBase(
    item,
    {
      enterDuration,
      exitDuration,
    },
  );
  return {
    isMounted,
    isVisible,
    isAnimating,
    isEntering,
    isExiting,
    state: () => {
      if(isEntering()) return "entering";
      if(isExiting()) return "exiting";
    },
  };
}
