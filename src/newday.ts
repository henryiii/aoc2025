import { writeFileSync } from "fs";

function generateDayTemplate(day: number): void {
  const padDay = String(day).padStart(2, "0");

  const srcTemplate = `\
export function solve_a(input: string): number {
    return input.split("\\n").map(Number).reduce((a, b) => a + b, 0);
}

export function solve_b(input: string): number {
    return input.split("\\n").map(Number).reduce((a, b) => a * b, 1);
}
`;

  const testTemplate = `\
import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/day${padDay}";

const input = \`
1
2
\`.trim();

describe("day${padDay} examples", () => {
    test("First example", () => {
        expect(solve_a(input)).toBe(3);
    });
    test("Second example", () => {
        expect(solve_b(input)).toBe(2);
    });
});
`;

  const srcPath = `src/day${padDay}.ts`;
  const testPath = `tests/day${padDay}.test.ts`;
  const inputPath = `inputs/day${padDay}.txt`;

  writeFileSync(srcPath, srcTemplate);
  writeFileSync(testPath, testTemplate);
  writeFileSync(inputPath, "");

  console.log(`Generated files for day ${day}:`);
  console.log(` - ${srcPath}`);
  console.log(` - ${testPath}`);
  console.log(` - ${inputPath}`);
}

const day = parseInt(process.argv[2]);
generateDayTemplate(day);
