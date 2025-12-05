import { describe, it, expect } from "vitest";
import { Grid, neighbors } from "../src/grid";

describe("Grid", () => {
  it("Construction", () => {
    const grid = new Grid<number>(3, 2, 0);
    expect(grid.width).toBe(3);
    expect(grid.height).toBe(2);
    expect(grid.rows).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("get and set", () => {
    const grid = new Grid<string>(2, 2, ".");
    expect(grid.get(0, 0)).toBe(".");
    grid.set(0, 0, "X");
    expect(grid.get(0, 0)).toBe("X");
    expect(() => grid.set(2, 0, "Y")).toThrow("Row index 2 out of bounds");
    expect(() => grid.set(0, 2, "Z")).toThrow("Column index 2 out of bounds");
  });

  it("at and set_at with Point", () => {
    const grid = new Grid<string>(2, 2, ".");
    expect(grid.at("0,1")).toBe(".");
    grid.set_at("0,1", "A");
    expect(grid.at("0,1")).toBe("A");
  });

  it("forEach", () => {
    const grid = new Grid<number>(2, 2, 1);
    let sum = 0;
    grid.forEach((value) => {
      sum += value;
    });
    expect(sum).toBe(4);
  });

  it("map", () => {
    const grid = new Grid<number>(2, 2, 2);
    const newGrid = grid.map((value) => value * 3);
    expect(newGrid.rows).toEqual([
      [6, 6],
      [6, 6],
    ]);
  });

  it("map with boolean", () => {
    const grid = new Grid<number>(2, 2, 0);
    grid.set(0, 0, 1);
    grid.set(1, 1, 2);
    const boolGrid = grid.map((value) => value > 0);
    expect(boolGrid.rows).toEqual([
      [true, false],
      [false, true],
    ]);
  });

  it("fromRows", () => {
    const input = ["abc", "def"];
    const grid = Grid.fromRows(input);
    expect(grid.rows).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
    ]);
  });

  it("fromRows with mapper", () => {
    const input = ["12", "34"];
    const grid = Grid.fromRows(input, Number);
    expect(grid.rows).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("reduce", () => {
    const grid = new Grid<number>(2, 2, 1);
    const sum = grid.reduce((acc, value) => acc + value, 0);
    expect(sum).toBe(4);
  });

  it("neighbors", () => {
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
});
