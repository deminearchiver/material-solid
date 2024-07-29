import { createThemeContract } from "@vanilla-extract/css";
import type { THEME } from ".";

// Entered manually to allow doc comments
export const COLOR = createThemeContract({
  primaryPaletteKeyColor: "",
  secondaryPaletteKeyColor: "",
  tertiaryPaletteKeyColor: "",
  neutralPaletteKeyColor: "",
  neutralVariantPaletteKeyColor: "",
  /**
   * @deprecated Use {@link THEME.color.surface | `color.surface`}
   */
  background: "",
  /**
   * @deprecated Use {@link THEME.color.onSurface | `color.onSurface`}
   */
  onBackground: "",
  surface: "",
  surfaceDim: "",
  surfaceBright: "",
  surfaceContainerLowest: "",
  surfaceContainerLow: "",
  surfaceContainer: "",
  surfaceContainerHigh: "",
  surfaceContainerHighest: "",
  onSurface: "",
  surfaceVariant: "",
  onSurfaceVariant: "",
  inverseSurface: "",
  inverseOnSurface: "",
  outline: "",
  outlineVariant: "",
  shadow: "",
  scrim: "",
  /**
   * @deprecated Use surface container roles instead
   */
  surfaceTint: "",
  primary: "",
  onPrimary: "",
  primaryContainer: "",
  onPrimaryContainer: "",
  inversePrimary: "",
  secondary: "",
  onSecondary: "",
  secondaryContainer: "",
  onSecondaryContainer: "",
  tertiary: "",
  onTertiary: "",
  tertiaryContainer: "",
  onTertiaryContainer: "",
  error: "",
  onError: "",
  errorContainer: "",
  onErrorContainer: "",
  primaryFixed: "",
  primaryFixedDim: "",
  onPrimaryFixed: "",
  onPrimaryFixedVariant: "",
  secondaryFixed: "",
  secondaryFixedDim: "",
  onSecondaryFixed: "",
  onSecondaryFixedVariant: "",
  tertiaryFixed: "",
  tertiaryFixedDim: "",
  onTertiaryFixed: "",
  onTertiaryFixedVariant: "",
  highestSurface: "",
});
