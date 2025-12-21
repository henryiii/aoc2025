import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/day00";

const input = `
1
2
3
`.trim();

describe("day00 examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(6);
  });
  test("Second example", () => {
    expect(solve_b(input)).toBe(6);
  });
});
