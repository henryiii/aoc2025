type Coords = [number, number, number];
type Point = `${number},${number},${number}`;

const toCoords = (input: Point): Coords =>
  input.split(",").map(Number) as Coords;

function euclideanDistance(x: Coords, y: Coords): number {
  return Math.sqrt(
    (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2,
  );
}

function find(parent: number[], x: number): number {
  const p = parent[x] as number;
  return p === x ? x : (parent[x] = find(parent, p));
}

function union(parent: number[], x: number, y: number): void {
  const [px, py] = [find(parent, x), find(parent, y)];
  if (px !== py) parent[py] = px;
}

function computePairs(points: Coords[]): [number, number, number][] {
  const pairs: [number, number, number][] = [];
  for (let i = 0; i < points.length; ++i) {
    for (let j = i + 1; j < points.length; ++j) {
      pairs.push([
        i,
        j,
        euclideanDistance(points[i] as Coords, points[j] as Coords),
      ]);
    }
  }
  pairs.sort((a, b) => a[2] - b[2]);
  return pairs;
}

function componentSizes(
  parent: number[],
  points: Coords[],
): Record<number, number> {
  return Object.fromEntries(
    points
      .map((_, i) => find(parent, i))
      .reduce((acc, p) => {
        acc.set(p, (acc.get(p) ?? 0) + 1);
        return acc;
      }, new Map()),
  );
}

// I didn't realize that you always count connections, so re-solved this with a
// lot of help from CoPilot after looking at the reddit thread. I'm not the only
// one who thought "nothing happens" meant do nothing!
export function solve_a(input: string, size = 1000): number {
  const points = input.split("\n").map((line) => toCoords(line as Point));
  const parent = Array.from({ length: points.length }, (_, i) => i);

  // Build pairs and union by distance
  const pairs = computePairs(points);
  for (let i = 0; i < Math.min(size, pairs.length); ++i) {
    const [a, b] = pairs[i] as [number, number, number];
    union(parent, a, b);
  }

  const count = componentSizes(parent, points);

  return Object.values(count)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, v) => acc * v, 1);
}

export function solve_b(input: string): number {
  const points = input.split("\n").map((line) => toCoords(line as Point));
  const parent = Array.from({ length: points.length }, (_, i) => i);

  const pairs = computePairs(points);
  let lastPair: [number, number, number] | null = null;

  for (const pair of pairs) {
    if (find(parent, pair[0]) !== find(parent, pair[1])) {
      union(parent, pair[0], pair[1]);
      lastPair = pair;
    }
  }

  if (!lastPair) {
    throw new Error("No valid pair found");
  }
  return (
    (points[lastPair[0]] as Coords)[0] * (points[lastPair[1]] as Coords)[0]
  );
}
