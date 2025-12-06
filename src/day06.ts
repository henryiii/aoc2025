import { Grid } from "./grid.ts";

type Op = "+" | "*";

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
    switch (op) {
      case "+":
        return total + col.reduce((a, b) => a + b, 0);
      case "*":
        return total + col.reduce((a, b) => a * b, 1);
      default:
        throw new Error(`Unknown operation: ${op}`);
    }
  }, 0);
}

function splitOnEmpty(arr: string[][]): [Op, Grid<string>][] {
  const groups: [Op, Grid<string>][] = [];
  let current: string[][] = [];
  let op: Op | undefined;

  for (const sub of arr) {
    if (sub.every((x) => !x || !x.trim())) {
      if (current.length > 0 && op) {
        groups.push([op, Grid.from(current, String)]);
        current = [];
        op = undefined;
      }
    } else {
      const last = sub.pop()?.trim();
      if (last) {
        op = last[0] as Op;
      }
      current.push(sub);
    }
  }

  if (current.length > 0 && op) {
    groups.push([op, Grid.from(current, String)]);
  }

  return groups;
}

export function solve_b(input: string): number {
  const grid = Grid.fromRows(input.split("\n"));
  return splitOnEmpty(grid.columns).reduce((total, [op, g]) => {
    return (
      total +
      g.rows.reduce(
        (colTotal, col) => {
          const num = parseInt(col.join(""), 10);
          switch (op) {
            case "+":
              return colTotal + num;
            case "*":
              return colTotal * num;
            default:
              throw new Error(`Unknown operation: ${op}`);
          }
        },
        op === "+" ? 0 : 1,
      )
    );
  }, 0);
}
