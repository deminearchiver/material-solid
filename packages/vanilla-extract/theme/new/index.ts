import { SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant, type DynamicScheme, type Hct } from "@material/material-color-utilities";

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

export type CreateContract<T extends MaterialThemeOptions> = {
  (): void;
}
export type CreateTheme<T extends MaterialThemeOptions> = {

}

export type MaterialTheme<T extends MaterialThemeOptions> = {
  createContract: CreateContract<T>;
  /**
   * Fills in the contract created with {@link createContract}
   */
  createTheme: CreateTheme<T>;
}



/**
 * @example
 * Roboto Flex
 * ```ts
 * ["Roboto Flex", "Roboto", "system-ui", "sans-serif"]
 * ```
 *
 * @example
 * Open Sans
 * ```ts
 * ["Open Sans", "system-ui", "sans-serif"]
 * ```
 */
export type MaterialThemeFontFamilies = string[];
export type MaterialThemeTypeface = {
  /**
   * @defaultValue `["system-ui", "sans-serif"]`
   */
  plain: MaterialThemeFontFamilies;
  brand: MaterialThemeFontFamilies;
}


export type CustomColorRole = string[] | "fixed" | "dynamic";
export type MaterialThemeContrastLevel = -1 | 0 | 1;

export interface MaterialThemeSharedColor {
  customRoles: Record<string, CustomColorRole>;
}

export interface MaterialThemeStaticColor extends MaterialThemeSharedColor {
  type: "static";
}
export interface MaterialThemeDynamicColor extends MaterialThemeSharedColor {
  type: "dynamic";
  seed: Hct;
  /**
   * @defaultValue `"tonalSpot"`
   */
  variant?: SchemeVariant;
  /**
   * @defaultValue `0`
   */
  contrastLevel?: MaterialThemeContrastLevel;
}

export type MaterialThemeColor = MaterialThemeStaticColor | MaterialThemeDynamicColor;


export type MaterialThemeOptions = {
  color?: Partial<MaterialThemeColor>;
  typeface?: Partial<MaterialThemeTypeface>;
}

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
>(options: T): MaterialTheme<T> => {
  return {
    createContract: () => {

    },
    createTheme: () => {
      // const Scheme = SCHEMES_MAP[options.color?.variant ?? "tonalSpot"];
    },
  };
}
