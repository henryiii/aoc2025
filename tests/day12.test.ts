import { describe, it, expect } from "vitest";
import { solve_a } from "../src/day12";

const input = `
0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2
`.trim();

describe("day12 examples", () => {
  it("First example", () => {
    expect(solve_a(input)).toBe(3);
  });
});
