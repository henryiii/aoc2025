import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day10";

const input = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
`.trim();

describe("day10 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(7);
  });
  it("Second example", async () => {
    expect(await solve_b(input)).toBe(33);
  });
});
