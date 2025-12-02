import { describe, it, expect } from "vitest";
import { solve_a } from "../src/day01";

const input = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim();

describe("day01 examples", () => {
  it("example input", () => {
    expect(solve_a(input)).toBe(3);
  });
});