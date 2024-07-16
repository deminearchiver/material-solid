import { createThemeContract } from "@vanilla-extract/css";
import { schemeToColors } from "../theme/color";
import { DEFAULT_TYPOGRAPHY } from "../theme/default/typography";

export const THEME = createThemeContract({
  color: schemeToColors(),
  // state: {},
  shape: {
    /**
     * 4px
     */
    extraSmall: "",
    /**
     * 8px
     */
    small: "",
    /**
     * 12px
     */
    medium: "",
    /**
     * 16px
     */
    large: "",
    /**
     * 28px
     */
    extraLarge: "",
    /**
     * Circular
     */
    full: "",
  },
  easing: {
    emphasized: "",
    emphasizedAccelerate: "",
    emphasizedDecelerate: "",
    standard: "",
    standardAccelerate: "",
    standardDecelerate: "",
  },
  duration: {
    /**
     * 50ms
     */
    short1: "",
    /**
     * 100ms
     */
    short2: "",
    /**
     * 150ms
     */
    short3: "",
    /**
     * 200ms
     */
    short4: "",
    /**
     * 250ms
     */
    medium1: "",
    /**
     * 300ms
     */
    medium2: "",
    /**
     * 350ms
     */
    medium3: "",
    /**
     * 400ms
     */
    medium4: "",
    /**
     * 450ms
     */
    long1: "",
    /**
     * 500ms
     */
    long2: "",
    /**
     * 550ms
     */
    long3: "",
    /**
     * 600ms
     */
    long4: "",
    /**
     * 700ms
     */
    extraLong1: "",
    /**
     * 800ms
     */
    extraLong2: "",
    /**
     * 900ms
     */
    extraLong3: "",
    /**
     * 1000ms
     */
    extraLong4: "",
  },
  text: DEFAULT_TYPOGRAPHY,
});
