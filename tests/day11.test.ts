import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day11";

const input = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out
`.trim();

describe("day11 examples", () => {
    it("First example", () => {
        expect(solve_a(input)).toBe(5);
    });
    it("Second example", () => {
        expect(solve_b(input)).toBe(0);
    });
});
