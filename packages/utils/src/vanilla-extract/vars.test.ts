import { expect, it } from "vitest";
import { getVarName } from "./vars";

it("valid input", () => {
  expect(getVarName("var(--foo)")).toBe("--foo");
});

it("invalid input", () => {
  expect(getVarName("--bar")).toBe("--bar");
});
