import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/day09";

const input = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`.trim();

describe("day09 examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(50);
  });
  test("Second example", () => {
    expect(solve_b(input)).toBe(24);
  });
});
