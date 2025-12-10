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
    return new Grid<O>(input[0].length, input.length, ([ri, ci]) =>
      mapper(input[ri][ci], [ri, ci]),
    );
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
    return this.data.length ? this.data[0].length : 0;
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
    return this.data.at(ri)?.at(ci);
  }

  at(position: Point | Coords): T | undefined {
    const [ri, ci] =
      typeof position === "string" ? toCoords(position) : position;
    return this.get(ri, ci);
  }

  set(ri: number, ci: number, value: T): void {
    if (this.data.at(ri) === undefined) {
      throw new Error(`Row index ${ri} out of bounds`);
    }
    if (this.data[ri].at(ci) === undefined) {
      throw new Error(`Column index ${ci} out of bounds`);
    }
    this.data[ri][ci] = value;
  }

  set_at(position: Point | Coords, value: T): void {
    const [ri, ci] =
      typeof position === "string" ? toCoords(position) : position;
    this.set(ri, ci, value);
  }

  forEach(callback: (value: T, coords: Coords) => void): void {
    for (let ri = 0; ri < this.height; ri++) {
      for (let ci = 0; ci < this.width; ci++) {
        callback(this.data[ri][ci], [ri, ci]);
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
    for (let ri = 0; ri < this.height; ri++) {
      for (let ci = 0; ci < this.width; ci++) {
        if (predicate(this.data[ri][ci], [ri, ci])) {
          yield [ri, ci];
        }
      }
    }
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
