import lpSolver, { type LPModel } from "javascript-lp-solver";

export function solveCoefficients(
  joltages: number[],
  buttons: number[][],
): number {
  const variables: Record<string, Record<string, number>> = {};
  const ints: Record<string, 1> = {};
  const constraints: Record<string, { equal?: number }> = {};
  buttons.forEach((button, i) => {
    const varName = `x${i}`;
    const variable: Record<string, number> = { sum: 1 };
    variables[varName] = variable;
    ints[varName] = 1;
    for (const j of button) {
      variable[`j${j}`] = 1;
    }
  });
  joltages.forEach((joltage, j) => {
    constraints[`j${j}`] = { equal: joltage };
  });
  const model: LPModel = {
    optimize: "sum",
    opType: "min",
    constraints,
    variables,
    ints,
  };
  const result = lpSolver.Solve(model);
  if (!result.feasible) return -1;
  let sum = 0;
  for (let i = 0; i < buttons.length; ++i) {
    const v = result[`x${i}`] ?? 0;
    if (typeof v !== "number" || v < 0 || Math.round(v) !== v) return -1;
    sum += v;
  }
  return sum;
}

class Machine {
  target: boolean[];
  toggles: number[][];
  joltages: number[];

  constructor(target: boolean[], toggles: number[][], joltages: number[]) {
    this.target = target;
    this.toggles = toggles;
    this.joltages = joltages;
  }

  static fromString(s: string): Machine {
    const target =
      s
        .match(/\[(.*?)\]/)?.[1]
        ?.split("")
        .map((c) => c === "#") || [];

    const toggles = (s.match(/\((.*?)\)/g) || []).map((tm) =>
      tm
        .slice(1, -1)
        .split(",")
        .filter((x) => x.length > 0)
        .map(Number),
    );

    const joltages =
      s
        .match(/\{(.*?)\}/)?.[1]
        ?.split(",")
        .map(Number) || [];

    return new Machine(target, toggles, joltages);
  }

  minPresses(): number {
    const n = this.toggles.length;
    let min = Infinity;
    for (let mask = 0; mask < 1 << n; mask++) {
      const state = new Array(this.target.length).fill(false);
      for (let i = 0; i < n; i++) {
        if ((mask & (1 << i)) !== 0) {
          for (const idx of this.toggles[i] ?? []) {
            state[idx] = !state[idx];
          }
        }
      }
      if (state.every((v, i) => v === this.target[i])) {
        min = Math.min(min, mask.toString(2).split("0").join("").length);
      }
    }
    return min === Infinity ? -1 : min;
  }

  minPressesJoltage(): number {
    return solveCoefficients(this.joltages, this.toggles);
  }
}

export function solve_a(input: string): number {
  const machines = input.split("\n").map((s) => Machine.fromString(s));
  return machines.reduce((sum, machine) => sum + machine.minPresses(), 0);
}

export function solve_b(input: string): number {
  const machines = input.split("\n").map((s) => Machine.fromString(s));
  return machines.reduce(
    (sum, machine) => sum + machine.minPressesJoltage(),
    0,
  );
}
