import { emphasizedOptimized } from "../emphasized";

export const DEFAULT_EASING = {
  emphasized: emphasizedOptimized,
  emphasizedAccelerate: "cubic-bezier(0.3, 0.0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1.0)",
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1);",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1);",
};
export const DEFAULT_DURATION = {
  short1: "50ms",
  short2: "100ms",
  short3: "150ms",
  short4: "200ms",
  medium1: "250ms",
  medium2: "300ms",
  medium3: "350ms",
  medium4: "400ms",
  long1: "450ms",
  long2: "500ms",
  long3: "550ms",
  long4: "600ms",
  extraLong1: "700ms",
  extraLong2: "800ms",
  extraLong3: "900ms",
  extraLong4: "1000ms",
};
