import { Grid, neighbors } from "./grid.js";

export function solve_a(input: string): number {
  const grid = Grid.fromRows(input.split("\n"), (ch) => ch === "@");
  return grid.reduce((acc, value, coords) => {
    if (!value) return acc;
    const neighborCoords = Array.from(neighbors(coords));
    const neighborCount = neighborCoords.filter(([nri, nci]) =>
      grid.get(nri, nci),
    ).length;
    return acc + (neighborCount < 4 ? 1 : 0);
  }, 0);
}
