type Coords = [number, number, number];
type Point = `${number},${number},${number}`;

const toCoords = (input: Point): Coords =>
  input.split(",").map(Number) as Coords;

function euclideanDistance(x: Coords, y: Coords): number {
  return Math.sqrt(
    (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2,
  );
}

// I didn't realize that you always count connections, so re-solved this with a
// lot of help from CoPilot after looking at the reddit thread. I'm not the only
// one who thought "nothing happens" meant do nothing!
export function solve_a(input: string, size = 1000): number {
  const points = input.split("\n").map((line) => toCoords(line as Point));

  // Union-Find structure
  const parent = Array.from({ length: points.length }, (_, i) => i);
  const find = (x: number): number =>
    parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (x: number, y: number) => {
    const [px, py] = [find(x), find(y)];
    if (px !== py) parent[py] = px;
  };

  // Build pairs and union by distance
  const pairs: [number, number, number][] = [];
  for (let i = 0; i < points.length; ++i) {
    for (let j = i + 1; j < points.length; ++j) {
      pairs.push([i, j, euclideanDistance(points[i], points[j])]);
    }
  }

  pairs.sort((a, b) => a[2] - b[2]);
  for (let i = 0; i < Math.min(size, pairs.length); ++i) {
    union(pairs[i][0], pairs[i][1]);
  }

  // Count component sizes
  const count: Record<number, number> = {};
  points.forEach((_, i) => {
    const p = find(i);
    count[p] = (count[p] || 0) + 1;
  });

  return Object.values(count)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, v) => acc * v, 1);
}

export function solve_b(input: string): number {
  return 2;
}
