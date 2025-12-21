import { describe, test, expect } from "bun:test";
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

const input2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out
`.trim();

describe("day11 examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(5);
  });
  test("Second example", () => {
    expect(solve_b(input2)).toBe(2);
  });
});
