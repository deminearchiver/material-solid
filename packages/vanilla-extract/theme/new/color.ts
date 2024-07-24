import { DynamicColor, MaterialDynamicColors, type DynamicScheme, hexFromArgb, type Hct, SchemeTonalSpot } from "@material/material-color-utilities";

// export type ColorsRecord<O, T = DynamicColor> = {
//   [P in keyof O as O[P] extends DynamicColor ? P : never]: T;
// }
// export type MaterialDynamicColorsRecord =
//   & ColorsRecord<typeof MaterialDynamicColors, string>
//   & {
//     highestSurface: string;
//   };

export const DYNAMIC_COLORS = {
  "primaryPaletteKeyColor": MaterialDynamicColors.primaryPaletteKeyColor,
  "secondaryPaletteKeyColor": MaterialDynamicColors.secondaryPaletteKeyColor,
  "tertiaryPaletteKeyColor": MaterialDynamicColors.tertiaryPaletteKeyColor,
  "neutralPaletteKeyColor": MaterialDynamicColors.neutralPaletteKeyColor,
  "neutralVariantPaletteKeyColor": MaterialDynamicColors.neutralVariantPaletteKeyColor,
  "background": MaterialDynamicColors.background,
  "onBackground": MaterialDynamicColors.onBackground,
  "surface": MaterialDynamicColors.surface,
  "surfaceDim": MaterialDynamicColors.surfaceDim,
  "surfaceBright": MaterialDynamicColors.surfaceBright,
  "surfaceContainerLowest": MaterialDynamicColors.surfaceContainerLowest,
  "surfaceContainerLow": MaterialDynamicColors.surfaceContainerLow,
  "surfaceContainer": MaterialDynamicColors.surfaceContainer,
  "surfaceContainerHigh": MaterialDynamicColors.surfaceContainerHigh,
  "surfaceContainerHighest": MaterialDynamicColors.surfaceContainerHighest,
  "onSurface": MaterialDynamicColors.onSurface,
  "surfaceVariant": MaterialDynamicColors.surfaceVariant,
  "onSurfaceVariant": MaterialDynamicColors.onSurfaceVariant,
  "inverseSurface": MaterialDynamicColors.inverseSurface,
  "inverseOnSurface": MaterialDynamicColors.inverseOnSurface,
  "outline": MaterialDynamicColors.outline,
  "outlineVariant": MaterialDynamicColors.outlineVariant,
  "shadow": MaterialDynamicColors.shadow,
  "scrim": MaterialDynamicColors.scrim,
  "surfaceTint": MaterialDynamicColors.surfaceTint,
  "primary": MaterialDynamicColors.primary,
  "onPrimary": MaterialDynamicColors.onPrimary,
  "primaryContainer": MaterialDynamicColors.primaryContainer,
  "onPrimaryContainer": MaterialDynamicColors.onPrimaryContainer,
  "inversePrimary": MaterialDynamicColors.inversePrimary,
  "secondary": MaterialDynamicColors.secondary,
  "onSecondary": MaterialDynamicColors.onSecondary,
  "secondaryContainer": MaterialDynamicColors.secondaryContainer,
  "onSecondaryContainer": MaterialDynamicColors.onSecondaryContainer,
  "tertiary": MaterialDynamicColors.tertiary,
  "onTertiary": MaterialDynamicColors.onTertiary,
  "tertiaryContainer": MaterialDynamicColors.tertiaryContainer,
  "onTertiaryContainer": MaterialDynamicColors.onTertiaryContainer,
  "error": MaterialDynamicColors.error,
  "onError": MaterialDynamicColors.onError,
  "errorContainer": MaterialDynamicColors.errorContainer,
  "onErrorContainer": MaterialDynamicColors.onErrorContainer,
  "primaryFixed": MaterialDynamicColors.primaryFixed,
  "primaryFixedDim": MaterialDynamicColors.primaryFixedDim,
  "onPrimaryFixed": MaterialDynamicColors.onPrimaryFixed,
  "onPrimaryFixedVariant": MaterialDynamicColors.onPrimaryFixedVariant,
  "secondaryFixed": MaterialDynamicColors.secondaryFixed,
  "secondaryFixedDim": MaterialDynamicColors.secondaryFixedDim,
  "onSecondaryFixed": MaterialDynamicColors.onSecondaryFixed,
  "onSecondaryFixedVariant": MaterialDynamicColors.onSecondaryFixedVariant,
  "tertiaryFixed": MaterialDynamicColors.tertiaryFixed,
  "tertiaryFixedDim": MaterialDynamicColors.tertiaryFixedDim,
  "onTertiaryFixed": MaterialDynamicColors.onTertiaryFixed,
  "onTertiaryFixedVariant": MaterialDynamicColors.onTertiaryFixedVariant,
  "highestSurface": MaterialDynamicColors.highestSurface,
};

// export const schemeToColors = (scheme?: DynamicScheme): MaterialDynamicColorsRecord => {
//   const colors = {} as MaterialDynamicColorsRecord;
//   for(const key in MaterialDynamicColors) {
//     const value = MaterialDynamicColors[key as keyof typeof MaterialDynamicColors];
//     if(value instanceof DynamicColor) {
//       colors[key as keyof MaterialDynamicColorsRecord] = scheme ? hexFromArgb(value.getArgb(scheme)) : "";
//     }
//   }
//   colors["highestSurface"] = scheme ? hexFromArgb(MaterialDynamicColors.highestSurface(scheme).getArgb(scheme)) : "";
//   return colors;
// }


const test1 = (scheme: DynamicScheme) => {

}
