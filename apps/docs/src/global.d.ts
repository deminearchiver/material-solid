declare module "lenis" {
  import _Lenis from "lenis";

  export type VirtualScrollEvent = {
    deltaX: number;
    deltaY: number;
    event: WheelEvent;
  }

  export interface LenisEvents {
    "scroll": (lenis: Lenis) => void;
    "virtual-scroll": (event: VirtualScrollEvent) => void;
  }

  interface Lenis extends _Lenis {
    /**
     * @returns An unsubscribe function
     */
    on<T extends keyof LenisEvents>(event: T, callback: LenisEvents[T]): () => void;
    off<T extends keyof LenisEvents>(event: T, callback: LenisEvents[T]): void;
  }
}

export {};
