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
      tm.slice(1, -1).split(",").map(Number),
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
          for (const idx of this.toggles[i]) {
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
}

export function solve_a(input: string): number {
  const machines = input.split("\n").map((s) => Machine.fromString(s));
  return machines.reduce((sum, machine) => sum + machine.minPresses(), 0);
}

export function solve_b(input: string): number {
  return input
    .split("\n")
    .map(Number)
    .reduce((a, b) => a * b, 1);
}
