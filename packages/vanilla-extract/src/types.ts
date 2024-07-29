import type { Hct } from "@material/material-color-utilities";
import type { MaterialDurationThemeContract, MaterialEasingThemeContract, MaterialTextThemeContract, MaterialThemeContract, MaterialTypefaceThemeContract } from "./contract";
import type { Simplify, SimplifyLeaf } from "@material-solid/utils/types";

export type CSSVarFunction = `var(--${string})` | `var(--${string}, ${string | number})`;


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

type OptionalOverride<T extends Record<string, unknown>, U = string> = {
  [P in keyof T]?: U;
} & Record<string, U>;
type RequiredOverride<T extends Record<string, unknown>, U = string> = {
  [P in keyof T]: U;
} & Record<string, U>;

export type MaterialThemeOptions = {
  color: MaterialThemeColorOptions;
  /**
   * @defaultValue `{}`
   */
  easing?: OptionalOverride<MaterialEasingThemeContract>;
  /**
   * @defaultValue `{}`
   */
  duration?: OptionalOverride<MaterialDurationThemeContract>;
  typeface: RequiredOverride<MaterialTypefaceThemeContract, string[]>;
}

type MergeThemeContract<
  T extends MaterialThemeOptions
> =
  & MaterialThemeContract
  & {
    typeface: MaterialTypefaceThemeContract & {
      [P in keyof T["typeface"]]: CSSVarFunction;
    };
  };

export type MaterialThemeBrightness = "light" | "dark";

export type CreateThemeOptions<T extends MaterialThemeOptions> = {
  brightness: MaterialThemeBrightness;
}

export type MaterialTheme<T extends MaterialThemeOptions> = {
  createContract: () => MergeThemeContract<T>;
  /**
   * Fills in the contract created with {@link createContract}
   */
  createTheme: (brightness: "light" | "dark") => SimplifyLeaf<MapTree<MergeThemeContract<MaterialThemeOptions>, string>, string>;
}

export type MapTree<T extends Record<string, unknown>, U> = {
  [P in keyof T]: T[P] extends Record<string | number, any> ? MapTree<T[P], U> : U;
};
