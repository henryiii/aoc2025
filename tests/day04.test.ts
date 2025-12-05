import { describe, it, expect } from "vitest";
import { solve_a } from "../src/day04";

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
});
