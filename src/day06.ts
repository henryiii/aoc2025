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
  const grid = Grid.fromRows(input.split("\n"));
  let total = 0;
  let subtotal = 0;
  let op: string | undefined = undefined;
  grid.columns.forEach((col, ci) => {
    if (op === undefined) {
      op = col.pop();
      console.log(`Operation for column ${ci}: ${op}`);
    }
    const nonzero = col.filter((d) => d !== undefined && d != " ").length;
    if (nonzero > 0) {
      const num = parseInt(col.join("").trim(), 10);
      switch (op) {
        case "+":
          subtotal += num;
          break;
        case "*":
          if (subtotal === 0) {
            subtotal = 1;
          }
          subtotal *= num;
          break;
        default:
          throw new Error(`Unknown operation: ${op}`);
      }
    }
    if (nonzero === 0 || ci === grid.width - 1) {
      total += subtotal;
      subtotal = 0;
      op = undefined;
    }
  });
  return total;
}
