/**
 * @module index
 */

import { Hct, SchemeAndroid, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant, type DynamicScheme } from "@material/material-color-utilities";
import { THEME, type MaterialThemeContract, type MaterialTypefaceThemeContract } from "./contract";
import type { CSSVarFunction, MapTree, MaterialTheme, MaterialThemeOptions, SchemeVariant } from "./types";
import { getSchemeColors } from "./color";
import type { Simplify, SimplifyLeaf } from "@material-solid/utils/types";
import { DEFAULT_DURATION, DEFAULT_EASING, DEFAULT_SHAPE, DEFAULT_TYPOGRAPHY } from "./defaults";
import { createThemeContract } from "@vanilla-extract/css";

interface SchemeConstructor {
  new (sourceColorHct: Hct, isDark: boolean, contrastLevel: number): DynamicScheme;
}

const SCHEMES_MAP: Record<SchemeVariant, SchemeConstructor> = {
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  tonalSpot: SchemeTonalSpot,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
  rainbow: SchemeRainbow,
  fruitSalad: SchemeFruitSalad,
};


/**
 * Creates a Material Theme with the provided defaults
 *
 * @example
 * If you want to add custom colors to a static color scheme
 * ```ts
 * createMaterialTheme({
 *   color: {
 *     custom: {
 *
 *     },
 *   },
 * })
 * ```
 *
 *
 * @example
 * Complete example
 * ```ts
 * import { createMaterialTheme } from "@material-solid/vanilla-extract";
 * const {
 *   createContract,
 *   createTheme,
 * } = createMaterialTheme({
 *   color: {
 *     seed: 0xFFFF0000,
 *     variant: "tonalSpot",
 *     customRoles: {
 *       success: "dynamic",
 *     },
 *   },
 * });
 * ```
 *
 * @see [Color system](https://m3.material.io/styles/color/system/overview)
 * @see [Color roles](https://m3.material.io/styles/color/roles)
 * @see [Choosing a color scheme](https://m3.material.io/styles/color/static/baseline)
 * @see [Static color scheme](https://m3.material.io/styles/color/static/baseline)
 * @see [Choosing a dynamic color scheme source](https://m3.material.io/styles/color/dynamic/choosing-a-source)
 */
export const createMaterialTheme = <
  const T extends MaterialThemeOptions
>(defaults: T): MaterialTheme<T> => {
  const typefaceContract = Object.fromEntries(
    Object.keys(defaults.typeface)
      .map(name => [name, ""]) ,
  ) as Record<keyof T["typeface"], string>;
  return {
    createContract: () => {
      const defaultTypefaces = Object.keys(THEME.typeface);
      const customTypefaces = Object.fromEntries(
        Object.keys(defaults.typeface)
          .filter(typeface => !defaultTypefaces.includes(typeface))
          .map(typeface => [typeface, ""]),
      ) as Record<Exclude<keyof T["typeface"], keyof MaterialTypefaceThemeContract>, string>;
      const customTypefaceContract = createThemeContract(customTypefaces);

      const typeface = {
        ...customTypefaceContract,
        ...THEME.typeface,
      } as Record<keyof MaterialTypefaceThemeContract | keyof T["typeface"], CSSVarFunction>;

      return {
        color: THEME.color,
        duration: THEME.duration,
        easing: THEME.easing,
        shape: THEME.shape,
        text: THEME.text,
        typeface,
      };
    },
    createTheme: (brightness) => {
      const isDark = brightness === "dark";
      const variant = defaults.color.variant ?? "tonalSpot";
      const contrastLevel = defaults.color.contrastLevel ?? 0;
      const Scheme = SCHEMES_MAP[variant];
      const scheme = new Scheme(defaults.color.seed, isDark, contrastLevel);
      const colors = getSchemeColors(scheme);

      const fontFamilies = Object.fromEntries(
        Object.entries(defaults.typeface)
          .map(
            ([typeface, values]) => [
              typeface,
              values
                .map(fontFamily => fontFamily.includes(" ") ? `"${fontFamily}"` : fontFamily)
                .join(",")
            ],
          ),
      ) as Record<keyof MaterialTypefaceThemeContract | keyof T["typeface"], string>;

      return {
        color: colors,
        duration: DEFAULT_DURATION,
        easing: DEFAULT_EASING,
        shape: DEFAULT_SHAPE,
        typeface: fontFamilies,
        text: DEFAULT_TYPOGRAPHY,
      };
    },
  };
}

export {
  Hct,
};
