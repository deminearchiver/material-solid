import { style } from "@vanilla-extract/css";
import { THEME } from "@material-solid/vanilla-extract/contract";
import { recipe } from "@vanilla-extract/recipes";

export const tooltipStyle = recipe({
  base: {
    border: "none",
    margin: 0,

    position: "absolute",
    top: 0,
    left: 0,
    width: "max-content",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    transition: `opacity 100ms linear`,
  },
  variants: {
    variant: {
      plain: {
        pointerEvents: "none",
        minHeight: 24,
        paddingInline: 8,

        backgroundColor: THEME.color.inverseSurface,
        borderRadius: THEME.shape.extraSmall,

        ...THEME.text.body.small,
        color: THEME.color.inverseOnSurface,
      },
      rich: {
        paddingInline: 16,
        paddingBlock: "12px 8px",
        backgroundColor: THEME.color.surfaceContainer,
        borderRadius: THEME.shape.medium,

        ...THEME.text.body.medium,
        color: THEME.color.onSurfaceVariant,
      },
    },
  },

});
