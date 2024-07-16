import { createSignal, type Accessor } from "solid-js"

export type SplashController = {
  hovered: Accessor<boolean>;
  pressed: Accessor<boolean>;
}

export type SplashOptions = {
  hovered: Accessor<boolean>;
  pressed: Accessor<boolean>;
}

export const createSplash = (options: SplashOptions): SplashController => {
  return {} as any;
}
