import { Grid, neighbors } from "./grid.js";

function can_remove(grid: Grid<boolean>): Grid<boolean> {
  return grid.map((value, coords) => {
    if (!value) return false;
    const neighborCoords = Array.from(neighbors(coords));
    const neighborCount = neighborCoords.filter(([nri, nci]) =>
      grid.get(nri, nci),
    ).length;
    return neighborCount < 4;
  });
}

export function solve_a(input: string): number {
  const grid = Grid.fromRows(input.split("\n"), (ch) => ch === "@");
  return can_remove(grid).reduce((acc, value) => acc + (value ? 1 : 0), 0);
}

export function solve_b(input: string): number {
  const grid = Grid.fromRows(input.split("\n"), (ch) => ch === "@");
  let removed = 0;
  let new_removed = 0;
  do {
    const removal = can_remove(grid);
    new_removed = removal.reduce((acc, value) => acc + (value ? 1 : 0), 0);
    removed += new_removed;
    removal.forEach((value, coords) => {
      if (value) grid.set(coords[0], coords[1], false);
    });
  } while (new_removed > 0);
  return removed;
}
