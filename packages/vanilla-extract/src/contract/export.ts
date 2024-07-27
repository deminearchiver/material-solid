/**
 * @module contract
 */

import type { Simplify } from "@material-solid/utils/types";
import { COLOR, DURATION, EASING, SHAPE, TEXT } from ".";
import { TYPEFACE } from "./typeface.css";

/**
 * @interface
 */
export type MaterialColorThemeContract = Simplify<typeof COLOR>;
/**
 * @interface
 */
export type MaterialTypefaceThemeContract = Simplify<typeof TYPEFACE>;
/**
 * @interface
 */
export type MaterialTextThemeContract = Simplify<typeof TEXT>;
/**
 * @interface
 */
export type MaterialShapeThemeContract = Simplify<typeof SHAPE>;
/**
 * @interface
 */
export type MaterialDurationThemeContract = Simplify<typeof DURATION>;
/**
 * @interface
 */
export type MaterialEasingThemeContract = Simplify<typeof EASING>;

export type MaterialThemeContract = {
  /**
   * @see [Color roles](https://m3.material.io/styles/color/roles)
   */
  color: MaterialColorThemeContract;
  typeface: MaterialTypefaceThemeContract;
  /**
   * @see [Fonts](https://m3.material.io/styles/typography/fonts)
   * @see [Type scale & tokens](https://m3.material.io/styles/typography/type-scale-tokens)
   */
  text: MaterialTextThemeContract;
  /**
   * @see [Shape scale & tokens](https://m3.material.io/styles/shape/shape-scale-tokens)
   */
  shape: MaterialShapeThemeContract;
  /**
   * @see [Applying easing and duration](https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration)
   * @see [Duration](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#c009dec6-f29b-4503-b9f0-482af14a8bbd)
   */
  duration: MaterialDurationThemeContract;
  /**
   * @see [Applying easing and duration](https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration)
   * @see [Easing](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#433b1153-2ea3-4fe2-9748-803a47bc97ee)
   */
  easing: MaterialEasingThemeContract;
}

export const THEME: MaterialThemeContract = {
  color: COLOR,
  typeface: TYPEFACE,
  text: TEXT,
  shape: SHAPE,
  duration: DURATION,
  easing: EASING,
};
