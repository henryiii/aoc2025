import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/day03";

const input = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

describe("day03 examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(357);
  });
  test("Second example", () => {
    expect(solve_b(input)).toBe(3121910778619);
  });
});
