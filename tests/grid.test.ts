import { describe, test, expect } from "bun:test";
import { Grid, neighbors } from "../src/grid";

describe("Grid", () => {
  test("Construction", () => {
    const grid = new Grid<number>(3, 2, 0);
    expect(grid.width).toBe(3);
    expect(grid.height).toBe(2);
    expect(grid.rows).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  test("get and set", () => {
    const grid = new Grid<string>(2, 2, ".");
    expect(grid.get(0, 0)).toBe(".");
    grid.set(0, 0, "X");
    expect(grid.get(0, 0)).toBe("X");
    expect(() => grid.set(2, 0, "Y")).toThrow("Row index 2 out of bounds");
    expect(() => grid.set(0, 2, "Z")).toThrow("Column index 2 out of bounds");
  });

  test("at and set_at with Point", () => {
    const grid = new Grid<string>(2, 2, ".");
    expect(grid.at("0,1")).toBe(".");
    grid.set_at("0,1", "A");
    expect(grid.at("0,1")).toBe("A");
  });

  test("forEach", () => {
    const grid = new Grid<number>(2, 2, 1);
    let sum = 0;
    grid.forEach((value) => {
      sum += value;
    });
    expect(sum).toBe(4);
  });

  test("map", () => {
    const grid = new Grid<number>(2, 2, 2);
    const newGrid = grid.map((value) => value * 3);
    expect(newGrid.rows).toEqual([
      [6, 6],
      [6, 6],
    ]);
  });

  test("map with boolean", () => {
    const grid = new Grid<number>(2, 2, 0);
    grid.set(0, 0, 1);
    grid.set(1, 1, 2);
    const boolGrid = grid.map((value) => value > 0);
    expect(boolGrid.rows).toEqual([
      [true, false],
      [false, true],
    ]);
  });

  test("fromRows", () => {
    const input = ["abc", "def"];
    const grid = Grid.fromRows(input);
    expect(grid.rows).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
    ]);
  });

  test("fromRows with mapper", () => {
    const input = ["12", "34"];
    const grid = Grid.fromRows(input, Number);
    expect(grid.rows).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("reduce", () => {
    const grid = new Grid<number>(2, 2, 1);
    const sum = grid.reduce((acc, value) => acc + value, 0);
    expect(sum).toBe(4);
  });

  test("neighbors", () => {
    const grid = new Grid<number>(3, 3, 0);
    grid.set(1, 1, 5);
    grid.set(0, 1, 1);
    grid.set(1, 0, 2);
    grid.set(1, 2, 3);
    grid.set(2, 1, 4);
    const neighborsCoords = Array.from(neighbors([1, 1]));
    const neighborsValues = neighborsCoords.map(([r, c]) => grid.get(r, c));
    expect(neighborsValues).toEqual([0, 1, 0, 2, 3, 0, 4, 0]);
  });

  test("findIter", () => {
    const grid = new Grid<number>(3, 3, 0);
    grid.set(0, 0, 1);
    grid.set(1, 1, 2);
    grid.set(2, 2, 1);
    const foundCoords = Array.from(grid.findIter((value) => value === 1));
    expect(foundCoords).toEqual([
      [0, 0],
      [2, 2],
    ]);
  });
});
