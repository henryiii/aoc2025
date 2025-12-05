import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day04";

const input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim();

describe("day04 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(13);
  });
  it("Second example", () => {
    expect(solve_b(input)).toBe(43);
  });
});
