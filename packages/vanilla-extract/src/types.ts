import type { Hct } from "@material/material-color-utilities";
import type { MaterialDurationThemeContract, MaterialEasingThemeContract, MaterialThemeContract } from "./contract/export";

export type SchemeVariant =
  | "monochrome"
  | "neutral"
  | "tonalSpot"
  | "vibrant"
  | "expressive"
  | "fidelity"
  | "content"
  | "rainbow"
  | "fruitSalad";

export type MaterialThemeColorOptions = {
  seed: Hct;
  /**
   * @defaultValue `"tonalSpot"`
   */
  variant?: SchemeVariant;
  /**
   * Value from -1 to 1. -1 represents minimum contrast. 0 represents standard, and 1 represents maximum contrast.
   * @defaultValue `0`
   */
  contrastLevel?: number;
}

type SimpleOverride<T extends Record<string, unknown>, U = string> = {
  [P in keyof T]?: U;
} & Record<string, U>;

export type MaterialThemeOptions<

> = {
  color: MaterialThemeColorOptions;
  /**
   * @defaultValue `{}`
   */
  easing?: SimpleOverride<MaterialEasingThemeContract>;
  /**
   * @defaultValue `{}`
   */
  duration?: SimpleOverride<MaterialDurationThemeContract>;
}

export type MaterialTheme<T extends MaterialThemeOptions> = {
  createContract: () => MaterialThemeContract;
  /**
   * Fills in the contract created with {@link createContract}
   */
  createTheme: (brightness: "light" | "dark") => void;
}

export type MapTree<T extends Record<string, unknown>, U> = {
  [P in keyof T]: T[P] extends Record<string | number, any> ? MapTree<T[P], U> : U;
};
