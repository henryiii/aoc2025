import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day06";

const input = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +
`.trim();

describe("day06 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(4277556);
  });
  it("Second example", () => {
    expect(solve_b(input)).toBe(6);
  });
});
