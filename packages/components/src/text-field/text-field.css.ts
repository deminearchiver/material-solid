import { THEME } from "@material-solid/vanilla-extract/contract";
import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const styles = {
  textField: recipe({
    base: {
      width: "100%",

      display: "inline-flex",

      outline: "none",
      resize: "both",
      textAlign: "start",
      WebkitTapHighlightColor: "transparent",
    },
  }),
  inputWrapper: recipe({
    base: {
      display: "flex",
    },
  }),
  input: recipe({
    base: {
      caretColor: THEME.color.primary,
      overflowX: "hidden",
      textAlign: "inherit",

      "::placeholder": {
        color: "currentcolor",
        opacity: 1,
      },
      "::-webkit-calendar-picker-indicator": {
        display: "none",
      },
      "::-webkit-search-cancel-button": {
        display: "none",
      },

      "@media": {
        "(forced-colors: active)": {
          background: "none",
        },
      },
    },
  }),
  icon: recipe({
    base: {
      position: "relative",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      fill: "currentcolor",
      color: "currentcolor",

      width: 24,
      height: 24,
      fontSize: 24,
    },
    variants: {
      affinity: {
        leading: {},
        trailing: {},
      }
    }
  }),
}

globalStyle(
  `${styles.inputWrapper.classNames.base} > *`,
  {
    all: "inherit",
    padding: 0,
  },
);
