import { describe, it, expect } from "vitest";
import { solve_a } from "../src/day03";

const input = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

describe("day03 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(357);
  });
});
