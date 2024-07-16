import { DynamicColor, type DynamicScheme, Hct, MaterialDynamicColors, SchemeTonalSpot, SchemeVibrant, SchemeMonochrome, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeNeutral, SchemeRainbow } from "@material/material-color-utilities";
import { schemeToColors, type ColorsRecord, type MaterialDynamicColorsRecord } from "./color";
import { createThemeContract } from "@vanilla-extract/css";
import { THEME } from "../contract/contract.css";
import { emphasizedAccurate } from "./emphasized";
import { DEFAULT_DURATION, DEFAULT_EASING } from "./default/motion";
import { DEFAULT_TYPOGRAPHY } from "./default/typography";
import type { CSSVarFunction, MapLeafNodes } from "./utils";
import { DEFAULT_SHAPE } from "./default/shape";

export const capitalize = (value: string) => {
  return value[0].toUpperCase() + value.slice(1);
}

type On<T extends string> = `on${Capitalize<T>}`;
type Container<T extends string> = `${T}Container`;
type OnContainer<T extends string> = `on${Capitalize<T>}Container`;

type ColorRoles<Roles extends string[], T> =
& {
  [P in Roles[number] as `${P}PaletteKeyColor`]: T;
}
& {
  [P in Roles[number]]: T;
}
& {
  [P in Roles[number] as On<P & string>]: T;
}
& {
  [P in Roles[number] as Container<P & string>]: T;
}
& {
  [P in Roles[number] as OnContainer<P & string>]: T;
}
interface SchemeConstructor {
  new (sourceColorHct: Hct, isDark: boolean, contrastLevel: number): DynamicScheme;
}
const SCHEMES_MAP = {
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  tonalSpot: SchemeTonalSpot,
  vibrant: SchemeVibrant,
  expressive: SchemeExpressive,
  fidelity: SchemeFidelity,
  content: SchemeContent,
  rainbow: SchemeRainbow,
  fruitSalad: SchemeFruitSalad,
} satisfies Record<string, SchemeConstructor>;

export interface CreateMaterialThemeOptions<CustomColors extends string[]> {
  color: {
    variant?: keyof typeof SCHEMES_MAP,
    seed: number | Hct;
    custom?: CustomColors;
  }
}

const parseHct = (color: number | Hct): Hct => {
  if(typeof color === "number") {
    return Hct.fromInt(color ^ 0xFF000000);
  }
  return color;
}


export const createMaterialTheme = <const CustomColors extends string[]>(options: CreateMaterialThemeOptions<CustomColors>) => {
  const variant = options.color.variant ?? "tonalSpot";
  const scheme = SCHEMES_MAP[variant];
  const seed = parseHct(options.color.seed);

  const lightScheme = new scheme(seed, false, 0);
  const darkScheme = new scheme(seed, true, 0);

  const factory = (scheme: DynamicScheme) => {
    return (customColors?: ColorRoles<CustomColors, string>) => {
      const defaultColors = schemeToColors(scheme);
      const data = {
        color: {
          ...defaultColors,
          ...customColors as ColorRoles<CustomColors, string>,
        },
        shape: DEFAULT_SHAPE,
        easing: DEFAULT_EASING,
        duration: DEFAULT_DURATION,
        text: DEFAULT_TYPOGRAPHY,
      } as const;
      return data;
    };
  }

  const customContract = Object.fromEntries(
    (options.color.custom ?? [])
      .flatMap(key => [
        `${key}PaletteKeyColor`,
        key,
        `on${capitalize(key)}`,
        `${key}Container`,
        `on${capitalize(key)}Container`,
      ])
      .map(key => [key, ""]),
  ) as ColorRoles<CustomColors, CSSVarFunction>;

  return {
    contract: (options: ContractOptions = { global: false }) => {
      if(options.global) {
        const prefix = options.prefix ?? "";
      }
      return {
        color: {
          ...THEME.color,
          ...createThemeContract(customContract),
        },
        shape: THEME.shape,
        easing: THEME.easing,
        duration: THEME.duration,
        text: THEME.text,
      };
    },
    light: factory(lightScheme),
    dark: factory(darkScheme),
  };
}

type ContractOptions =
  | { global: false; }
  | {
    global: true;
    prefix?: string;
  }

export { Hct };

