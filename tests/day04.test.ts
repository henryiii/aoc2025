import { describe, test, expect } from "bun:test";
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
  test("First example", () => {
    expect(solve_a(input)).toBe(13);
  });
  test("Second example", () => {
    expect(solve_b(input)).toBe(43);
  });
});
