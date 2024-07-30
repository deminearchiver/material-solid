import { expect, it } from "vitest";
import { fontVariationSettings } from "./css";

it("Font variation settings", () => {
  expect(
    fontVariationSettings({
      wght: 400,
      GRAD: 0,
      FILL: 1,
      opsz: 0,
    }),
  ).toBe(`"wght" 400, "GRAD" 0, "FILL" 1, "opsz" 0`);
});
