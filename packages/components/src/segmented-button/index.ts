// export {
//   type SegmentedButtonProps,
//   SegmentedButton,
// } from "./segmented-button";


// export {
//   type ButtonSegmentData,
//   ButtonSegment,
// } from "./button-segment";

import {
  ValueSegmentedButton,
} from "./value-segmented-button";

export const SegmentedButton = Object.assign(
  ValueSegmentedButton,
  { custom: () => "Hello world!" },
);

export {
  type ButtonSegmentProps,
  ButtonSegment,
} from "./value-segmented-button";
