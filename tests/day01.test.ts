import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day01";

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
  it("First example", () => {
    expect(solve_a(input)).toBe(3);
  });
  it("Second example", () => {
    expect(solve_b(input)).toBe(6);
  });
  it("Multiple crossings", () => {
    expect(solve_b("R50")).toBe(1);
    expect(solve_b("L50")).toBe(1);
    expect(solve_b("R1000")).toBe(10);
    expect(solve_b("L1000")).toBe(10);
    expect(solve_b("R251")).toBe(3);
    expect(solve_b("L251")).toBe(3);
    expect(solve_b("R249")).toBe(2);
    expect(solve_b("L249")).toBe(2);
    expect(solve_b("R250")).toBe(3);
    expect(solve_b("L250")).toBe(3);
  });
});
