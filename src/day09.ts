import { toCoords, Coords } from "./grid.js";

function area(first_corner: Coords, second_corner: Coords): number {
  return (
    (Math.abs(second_corner[0] - first_corner[0]) + 1) *
    (Math.abs(second_corner[1] - first_corner[1]) + 1)
  );
}

export function solve_a(input: string): number {
  const corners = input.split("\n").map(toCoords);
  return corners.reduce(
    (max, corner, i) =>
      Math.max(max, ...corners.slice(i + 1).map((c) => area(corner, c))),
    0,
  );
}

export function solve_b(input: string): number {
  return input
    .split("\n")
    .map(Number)
    .reduce((a, b) => a * b, 1);
}
