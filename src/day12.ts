import { Grid } from "./grid.js";

type Present = Grid<boolean>;
interface Region {
  size: [number, number];
  counts: number[];
}
interface InputData {
  presents: Present[];
  regions: Region[];
}

function parseInput(input: string): InputData {
  const lines = input
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const presents: Present[] = [];
  let i = 0;

  for (let p = 0; p < 6; ++p) {
    const header = lines[i];
    if (header === undefined || !/^\d+:$/.test(header))
      throw new Error(`Expected present header at line ${i}: ${header}`);
    presents.push(Grid.fromRows(lines.slice(++i, i + 3), (c) => c === "#"));
    i += 3;
  }

  const regions: Region[] = lines.slice(i).map((line) => {
    const m = line.match(/^(\d+)x(\d+):\s*((?:\d+\s*)+)$/);
    if (!m) throw new Error(`Invalid region format: ${line}`);
    return {
      size: [parseInt(m[1] as string, 10), parseInt(m[2] as string, 10)] as [
        number,
        number,
      ],
      counts: (m[3] as string).trim().split(/\s+/).map(Number),
    };
  });

  return { presents, regions };
}

// Try a simple check - if there are not enough spaces in the region for the presents, return false
function allPresentsFit(
  presents: Grid<boolean>[],
  regionSize: [number, number],
  counts: number[],
): boolean {
  const [h, w] = regionSize;
  const totalPresents = presents.reduce(
    (sum, present, idx) =>
      sum +
      present.reduce((isum, cur) => isum + (cur ? 1 : 0), 0) *
        (counts[idx] as number),
    0,
  );
  return h * w >= totalPresents;
}

export function solve_a(input: string): number {
  const data = parseInput(input);
  return data.regions.reduce(
    (sum, region) =>
      sum + (allPresentsFit(data.presents, region.size, region.counts) ? 1 : 0),
    0,
  );
}
