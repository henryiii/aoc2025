import { Grid } from "./grid.ts";
function zip<T, U>(a: T[], b: U[]): [T, U][] {
  return a
    .map((val, i) => [val, b[i]] as [T, U])
    .filter(([, y]) => y !== undefined);
}

export function solve_a(input: string): number {
  const lines = input.split("\n").map((line) => line.trim().split(/\s+/));
  const ops = lines.pop() || [];
  const grid = Grid.from(lines, Number);

  return zip(grid.columns, ops).reduce((total, [col, op]) => {
    let result: number;
    switch (op) {
      case "+":
        result = col.reduce((a, b) => a + b, 0);
        break;
      case "*":
        result = col.reduce((a, b) => a * b, 1);
        break;
      default:
        throw new Error(`Unknown operation: ${op}`);
    }
    return total + result;
  }, 0);
}

export function solve_b(input: string): number {
  return 6;
}
