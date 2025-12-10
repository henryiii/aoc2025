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

function inside_path(
  corners: Coords[],
  first: Coords,
  second: Coords,
): boolean {
  const [x1, y1] = first;
  const [x2, y2] = second;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  for (let i = 0; i < corners.length; i++) {
    const [xA, yA] = corners[i];
    const [xB, yB] = corners[(i + 1) % corners.length];

    if (
      (xA === xB &&
        xA > minX &&
        xA < maxX &&
        Math.max(Math.min(yA, yB), minY) < Math.min(Math.max(yA, yB), maxY)) ||
      (yA === yB &&
        yA > minY &&
        yA < maxY &&
        Math.max(Math.min(xA, xB), minX) < Math.min(Math.max(xA, xB), maxX))
    ) {
      return false;
    }
  }
  return true;
}

export function solve_b(input: string): number {
  const corners = input.split("\n").map(toCoords);
  return corners.reduce(
    (max, corner, i) =>
      Math.max(
        max,
        ...corners
          .slice(i + 1)
          .map((c) => (inside_path(corners, corner, c) ? area(corner, c) : 0)),
      ),
    0,
  );
}
