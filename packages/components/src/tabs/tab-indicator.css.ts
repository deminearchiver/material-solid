import { THEME } from "@material-solid/vanilla-extract/contract";
import { recipe } from "@vanilla-extract/recipes";

export const tabIndicatorStyle = recipe({
  base: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.color.primary,
  },
  variants: {
    variant: {
      primary: {
        borderRadius: "3px 3px 0 0",
        height: 3,
      },
      secondary: {
        height: 2,
      },
    },
  },
});
