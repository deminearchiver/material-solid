import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";
import { createSingletonRoot } from "@solid-primitives/rootless";
import { ReactiveSet } from "@solid-primitives/set";

export type RafCallback = (now: number) => void;


const useRafCallbacks = createSingletonRoot(
  () => {
    const callbacks = new ReactiveSet<FrameRequestCallback>();

    let id = 0;
    const loop: FrameRequestCallback = time => {
      id = requestAnimationFrame(loop);
      callbacks.forEach(callback => callback(time));
    }

    createEffect(() => {
      if(callbacks.size > 0) {
        id = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(id);
      }
    });

    return callbacks;
  },
);

export const createRaf = (
  callback: FrameRequestCallback,
): [running: Accessor<boolean>, start: VoidFunction, stop: VoidFunction] => {
  const callbacks = useRafCallbacks();

  const [running, setRunning] = createSignal(false);

  const start = () => {
    setRunning(true);
    callbacks.add(callback);
  }
  const stop = () => {
    setRunning(false);
    callbacks.delete(callback);
  }
  onCleanup(stop);

  return [running, start, stop];
}
