import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day05";

const input = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();

describe("day05 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(3);
  });
  it("Second example", () => {
    expect(solve_b(input)).toBe(14);
  });
});
