import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/day06";

const input = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +
`.trim();

describe("day06 examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(4277556);
  });
  test("Second example", () => {
    expect(solve_b(input)).toBe(3263827);
  });
});
