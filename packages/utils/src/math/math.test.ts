import { describe, expect, it } from "vitest";
import { normalize } from "./math";

describe("normalize", () => {
  it("Normalize", () => {
    expect(normalize(50, 0, 100)).toBe(0.5);
  });
  it("negative value", () => {
    expect(normalize(-75, 0, 100)).toBe(-0.75);
  });
  it("negative min", () => {
    expect(normalize(50, -100, 100)).toBe(0.75);
  });
  it("negative max", () => {
    expect(normalize(25, 50, -50)).toBe(0.25);
  });
});

