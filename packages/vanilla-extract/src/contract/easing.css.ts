import { createThemeContract } from "@vanilla-extract/css";

export const EASING = createThemeContract({
  /**
   * Linear
   * @defaultValue `linear`
   */
  linear: "",
  /**
   * Emphasized
   * @see [Emphasized easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#cbea5c6e-7b0d-47a0-98c3-767080a38d95)
   */
  emphasized: "",
  /**
   * Emphasized accelerate
   * @defaultValue `cubic-bezier(0.3, 0.0, 0.8, 0.15)`
   * @see [Emphasized easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#cbea5c6e-7b0d-47a0-98c3-767080a38d95)
   */
  emphasizedAccelerate: "",
  /**
   * Emphasized decelerate
   * @defaultValue `cubic-bezier(0.05, 0.7, 0.1, 1.0)`
   * @see [Emphasized easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#cbea5c6e-7b0d-47a0-98c3-767080a38d95)
   */
  emphasizedDecelerate: "",
  /**
   * Standard
   * @defaultValue `cubic-bezier(0.2, 0, 0, 1)`
   * @see [Standard easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#601d5552-a6e6-4d74-9886-ff8f24b9ec35)
   */
  standard: "",
  /**
   * Standard decelerate
   * @defaultValue `cubic-bezier(0, 0, 0, 1)`
   * @see [Standard easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#601d5552-a6e6-4d74-9886-ff8f24b9ec35)
   */
  standardAccelerate: "",
  /**
   * Standard accelerate
   * @defaultValue `cubic-bezier(0.3, 0, 1, 1)`
   * @see [Standard easing set](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#601d5552-a6e6-4d74-9886-ff8f24b9ec35)
   */
  standardDecelerate: "",
});
