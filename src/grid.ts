// Based on https://kittygiraudel.com/2024/01/01/2d-grid-helpers

export type Coords = [number, number];
type Point = `${number},${number}`;
export const toCoords = (input: Point) =>
  input.split(",").map(Number) as Coords;
export const toPoint = (coords: Coords): Point => `${coords[0]},${coords[1]}`;

type Mapper<I, O> = (value: I, coords: Coords) => O;
const identity = <I, O>(value: I) => value as unknown as O;

export class Grid<T> {
  private data: T[][];

  constructor(
    width: number,
    height: number,
    value: T | null | ((coords: Coords) => T) = null,
  ) {
    this.data = Array.from({ length: height }, (_, ri) =>
      Array.from({ length: width }, (_, ci) =>
        typeof value === "function"
          ? (value as CallableFunction)([ri, ci])
          : value,
      ),
    );
  }

  static from<I, O = I>(input: I[][], mapper: Mapper<I, O> = identity) {
    const grid = new Grid<O>(input[0]?.length ?? 0, input.length);
    input.forEach((row, ri) =>
      row.forEach((value, ci) => grid.set(ri, ci, mapper(value, [ri, ci]))),
    );
    return grid;
  }

  static fromRows<O = string>(
    input: string[],
    mapper: Mapper<string, O> = identity,
  ) {
    return Grid.from(
      input.map((row) => Array.from(row)),
      mapper,
    );
  }

  get width(): number {
    return this.data[0]?.length ?? 0;
  }

  get height(): number {
    return this.data.length;
  }

  get rows(): T[][] {
    return this.data;
  }

  get columns(): T[][] {
    return Array.from({ length: this.width }, (_, ci) =>
      this.rows.map((row) => row.at(ci) as T),
    );
  }

  get(ri: number, ci: number): T | undefined {
    // Index, not .at(): negative indices should be out of bounds, not wrap.
    if (ri < 0 || ci < 0) return undefined;
    return this.data[ri]?.[ci];
  }

  at(position: Point | Coords): T | undefined {
    const [ri, ci] =
      typeof position === "string" ? toCoords(position) : position;
    return this.get(ri, ci);
  }

  set(ri: number, ci: number, value: T): void {
    const row = this.data[ri];
    if (ri < 0 || row === undefined) {
      throw new Error(`Row index ${ri} out of bounds`);
    }
    if (ci < 0 || ci >= row.length) {
      throw new Error(`Column index ${ci} out of bounds`);
    }
    row[ci] = value;
  }

  set_at(position: Point | Coords, value: T): void {
    const [ri, ci] =
      typeof position === "string" ? toCoords(position) : position;
    this.set(ri, ci, value);
  }

  forEach(callback: (value: T, coords: Coords) => void): void {
    for (const [ri, row] of this.data.entries()) {
      for (const [ci, value] of row.entries()) {
        callback(value, [ri, ci]);
      }
    }
  }

  map<U>(callback: (value: T, coords: Coords) => U): Grid<U> {
    const result = new Grid<U>(this.width, this.height);
    this.forEach((value, coords) => {
      result.set_at(coords, callback(value, coords));
    });
    return result;
  }

  reduce<U>(
    callback: (accumulator: U, value: T, coords: Coords) => U,
    initialValue: U,
  ): U {
    let accumulator = initialValue;
    this.forEach((value, coords) => {
      accumulator = callback(accumulator, value, coords);
    });
    return accumulator;
  }

  *findIter(
    predicate: (value: T, coords: Coords) => boolean,
  ): IterableIterator<Coords> {
    for (const [ri, row] of this.data.entries()) {
      for (const [ci, value] of row.entries()) {
        if (predicate(value, [ri, ci])) {
          yield [ri, ci];
        }
      }
    }
  }

  toString(valueMapper: (value: T) => string = (v) => String(v)): string {
    return this.data.map((row) => row.map(valueMapper).join(" ")).join("\n");
  }
}

export function* neighbors(position: Point | Coords): IterableIterator<Coords> {
  const [ri, ci] = typeof position === "string" ? toCoords(position) : position;

  const deltas: Coords[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dr, dc] of deltas) {
    const nr = ri + dr;
    const nc = ci + dc;

    // Avoid negative indices due to wrapping
    if (nr < 0 || nc < 0) continue;

    const coords: Coords = [nr, nc];
    yield coords;
  }
}
