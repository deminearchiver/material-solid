import { THEME } from "@material-solid/vanilla-extract/contract";
import { globalStyle, layer, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const LABEL_DURATION_MS = 150;
const VISIBLE_DURATION_MS = Math.round(
  LABEL_DURATION_MS * 5 / 9
);
const ENTER_DELAY_MS = LABEL_DURATION_MS - VISIBLE_DURATION_MS;

export const styles = {
  field: recipe({
    base: {
      maxWidth: "100%",

      display: "flex",
      flex: 1,
      flexDirection: "column",

      writingMode: "horizontal-tb",
      resize: "inherit",
    },
    variants: {
      disabled: {
        true: {
          pointerEvents: "none",
        },
      },
    },
  }),
  containerOverflow: recipe({
    base: {
      position: "relative",
      height: "100%",

      display: "flex",

      borderStartStartRadius: THEME.shape.extraSmall,
      borderStartEndRadius: THEME.shape.extraSmall,

      resize: "inherit",
    },
  }),
  container: recipe({
    base: {
      position: "relative",
      minWidth: "min-content",
      minHeight: "100%",
      maxHeight: "100%",
      flex: 1,

      display: "flex",
      alignItems: "center",

      borderRadius: "inherit",
    },
  }),
  labelWrapper: recipe({
    base: {
      position: "absolute",
      inset: 0,

      textAlign: "initial",

      pointerEvents: "none",
    },
    variants: {
      withStart: {
        false: {
          marginInlineStart: 16,
        },
      },
      withEnd: {
        false: {
          marginInlineEnd: 16,
        },
      },
    },
    defaultVariants: {
      withStart: false,
      withEnd: false,
    }
  }),
  label: recipe({
    base: {
      display: "block",
      width: "min-content",
      maxWidth: "100%",
      zIndex: 1,

      boxSizing: "border-box",

      overflow: "hidden",


      ...THEME.text.body.large,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: THEME.color.onSurfaceVariant,
    },
    variants: {
      type: {
        resting: {
          position: "absolute",
          top: 16,
        },
        floating: {
          position: "absolute",
          top: 8,
          transformOrigin: "top left",

          fontSize: THEME.text.body.small.fontSize,
          lineHeight: THEME.text.body.small.lineHeight,
        },
      },
      focused: {
        true: {
          color: THEME.color.primary,
        },
      },
      hidden: {
        true: {
          opacity: 0,
        },
      },
      disabled: {
        true: {
          color: THEME.color.onSurface,
          opacity: 0.38,
        },
      },
    },
    compoundVariants: [
      {
        variants: {
          hidden: false,
          disabled: true,
        },
        style: {
          "@media": {
            "(forced-colors: active)": {
              color: "GrayText",
              opacity: 1,
            }
          },
        },
      },
    ],
    defaultVariants: {
      hidden: false,
      disabled: false,
    }
  }),
  section: recipe({
    base: {
      position: "relative",
      height: "100%",

      display: "flex",
      boxSizing: "border-box",
    },
    variants: {
      position: {
        start: {
          alignItems: "center",
          justifyContent: "center",

          color: THEME.color.onSurfaceVariant,
        },
        middle: {
          flex: 1,
          alignSelf: "baseline",

          alignItems: "stretch",
        },
        end: {
          alignItems: "center",
          justifyContent: "center",

          color: THEME.color.onSurfaceVariant,
        },
      },
    },
  }),
  content: recipe({
    base: {
      flex: 1,
      display: "flex",

      opacity: 0,
      color: THEME.color.onSurface,

      transitionProperty: "opacity",
      transitionDuration: `${VISIBLE_DURATION_MS}ms`,
      transitionTimingFunction: THEME.easing.emphasized,
    },
    variants: {
      withStart: {
        false: {},
      },
      withEnd: {
        false: {},
      },
      populated: {
        true: {
          opacity: 1,
          transitionDelay: `${ENTER_DELAY_MS}ms`,
        },
      },
      focused: {
        true: {
          opacity: 1,
          transitionDelay: `${ENTER_DELAY_MS}ms`,
        },
      },
      disableTransitions: {
        true: {
          transition: "none",
        },
      },
      disabled: {
        true: {
          transition: "none",

          "@media": {
            "(forced-colors: active)": {
              color: "GrayText",
              opacity: 1,
            },
          },
        },
      },
    },
    defaultVariants: {
      populated: false,
      focused: false,
      withStart: false,
      withEnd: false,
    }
  }),
  supportingText: recipe({
    base: {
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      paddingTop: 4,
      paddingInline: 16,

      ...THEME.text.body.small,
      color: THEME.color.onSurfaceVariant,
    },
    variants: {
      disabled: {
        true: {
          "@media": {
            "(forced-colors: active)": {
              color: "GrayText",
              opacity: 1,
            },
          },
        },
      }
    },
  }),
} as const;

globalStyle(
  `${styles.content.classNames.base} > *`,
  {
    all: "unset",

    width: "100%",

    ...THEME.text.body.large,
    color: "currentcolor",

    overflowWrap: "revert",
    whiteSpace: "revert",
  },
);
globalStyle(
  `${styles.content.classNames.base} > :not(textarea)`,
  {
    paddingTop: `calc(8px + ${THEME.text.body.small.lineHeight})`,
    paddingBottom: 8,
  },
);
globalStyle(
  `${styles.content.classNames.base} > textarea`,
  {
    marginTop: 16,
    marginBottom: 16,
  },
);

globalStyle(
  `${styles.content.classNames.variants.withStart.false} > *`,
  {
    paddingInlineStart: 16,
  },
);
globalStyle(
  `${styles.content.classNames.variants.withEnd.false} > *`,
  {
    paddingInlineEnd: 16,
  },
);
