import { Grid, Coords, toPoint } from "./grid.js";

function splits(start: Coords, grid: Grid<string>, visited: Grid<boolean>): void {
  const next: Coords = [start[0] + 1, start[1]];
  const char = grid.at(next);
  if (char === undefined) {
    return;
  }
  if (char === "^") {
    if (visited.at(next) ?? false) {
      return;
    }
    visited.set_at(toPoint(next), true);
    splits([next[0], next[1] + 1], grid, visited);
    splits([next[0], next[1] - 1], grid, visited);
  } else {
    splits(next, grid, visited);
  }
}

export function solve_a(input: string): number {
  const grid = Grid.fromRows(input.split("\n"));
  const start: Coords = grid.findIter((v) => v === "S").next().value;
  const visited = new Grid<boolean>(grid.width, grid.height, false);
  splits(start, grid, visited);
  return visited.reduce((acc, v) => acc + (v ? 1 : 0), 0);
}

export function solve_b(input: string): number {
  const grid = Grid.fromRows(input.split("\n"));
  const start: Coords = grid.findIter((v) => v === "S").next().value;
  const paths = new Grid<number>(grid.width, grid.height, 0);
  paths.set_at(toPoint(start), 1);
  for (let ri = start[0] + 1; ri < grid.height; ri++) {
    for (let ci = 0; ci < grid.width; ci++) {
      const char = grid.get(ri, ci);
      if (char === "^") {
        const left = ci > 0 ? paths.get(ri - 1, ci - 1) ?? 0 : 0;
        const right = ci < grid.width - 1 ? paths.get(ri - 1, ci + 1) ?? 0 : 0;
        paths.set(ri, ci, left + right);
      } else {
        paths.set(ri, ci, paths.get(ri - 1, ci) ?? 0);
      }
    }
  }
  let total = 0;
  for (let ci = 0; ci < grid.width; ci++) {
    total += paths.get(grid.height - 1, ci) ?? 0;
  }
  return total;
}
