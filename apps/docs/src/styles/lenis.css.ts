import { globalStyle } from "@vanilla-extract/css";

globalStyle(
  "html.lenis, html.lenis body",
  {
    height: "auto",
  },
);

globalStyle(
  ".lenis.lenis-smooth",
  {
    scrollBehavior: "auto !important" as any,
  },
);

globalStyle(
  ".lenis.lenis-smooth [data-lenis-prevent]",
  { overscrollBehavior: "contain" },
);

globalStyle(
  ".lenis.lenis-stopped",
  { overflow: "hidden" },
);

globalStyle(
  ".lenis.lenis-smooth iframe",
  { pointerEvents: "none" },
);
