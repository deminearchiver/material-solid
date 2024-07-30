import { expect, it } from "vitest";
import { clsx } from "./clsx";

it("concatenation", () => {
  expect(clsx("foo", "bar")).toBe("foo bar");
});

it("empty string", () => {
  expect(clsx()).toBe("");

});

