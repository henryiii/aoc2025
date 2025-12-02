import { describe, it, expect } from "vitest";
import { solve_a } from "../src/day00";

const input = `
1
2
3
`.trim();

describe("day00 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(6);
  });
});
