import { createThemeContract } from "@vanilla-extract/css";

export const SHAPE = createThemeContract({
  /**
   * Extra small (4dp)
   * @defaultValue `4px`
   */
  extraSmall: "",
  /**
   * Small (8dp)
   * @defaultValue `8px`
   */
  small: "",
  /**
   * Medium (12dp)
   * @defaultValue `12p"`
   */
  medium: "",
  /**
   * Large (16dp)
   * @defaultValue `16px`
   */
  large: "",
  /**
   * Extra large (28dp)
   * @defaultValue `28px`
   */
  extraLarge: "",
  /**
   * Full (circular)
   * @defaultValue `9999px`
   */
  full: "",
});
