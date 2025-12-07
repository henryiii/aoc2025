import { writeFileSync } from "fs";

function generateDayTemplate(day: number): void {
  const padDay = String(day).padStart(2, "0");

  const srcPath = `src/day${padDay}.ts`;
  const srcTemplate = `\
export function solve_a(input: string): number {
    return input.split("\\n").map(Number).reduce((a, b) => a + b, 0);
}

export function solve_b(input: string): number {
    return input.split("\\n").map(Number).reduce((a, b) => a * b, 1);
}
`;

  const testPath = `tests/day${padDay}.test.ts`;
  const testTemplate = `\
import { describe, it, expect } from "vitest";
import { solve_a, solve_b } from "../src/day${padDay}";

const input = \`
1
2
\`.trim();

describe("day${padDay} examples", () => {
    it("First example", () => {
        expect(solve_a(input)).toBe(3);
    });
    it("Second example", () => {
        expect(solve_b(input)).toBe(2);
    });
});
`;

  writeFileSync(srcPath, srcTemplate);
  writeFileSync(testPath, testTemplate);

  console.log(`Generated files for day ${day}:`);
  console.log(` - ${srcPath}`);
  console.log(` - ${testPath}`);
}

const day = parseInt(process.argv[2]);
generateDayTemplate(day);
