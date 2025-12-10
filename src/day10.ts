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
    const match = s.match(/\[(.*?)\]/);
    if (!match) {
      throw new Error("Invalid target");
    }
    const target = match[1].split("").map((c) => c === "#");

    const toggleMatches = s.match(/\((.*?)\)/g);
    if (!toggleMatches) {
      throw new Error("Invalid toggles");
    }
    const toggles = toggleMatches.map((tm) => {
      const nums = tm.slice(1, -1).split(",").map(Number);
      return nums;
    });

    const joltMatch = s.match(/\{(.*?)\}/);
    if (!joltMatch) {
      throw new Error("Invalid joltages");
    }
    const joltages = joltMatch[1].split(",").map(Number);
    return new Machine(target, toggles, joltages);
  }

  minPresses(): number {
    // Brute-force all combinations of button presses
    const n = this.toggles.length;
    let min = Infinity;
    for (let mask = 0; mask < 1 << n; mask++) {
      const state = new Array(this.target.length).fill(false);
      let presses = 0;
      for (let i = 0; i < n; i++) {
        if ((mask & (1 << i)) !== 0) {
          for (const idx of this.toggles[i]) {
            state[idx] = !state[idx];
          }
          presses++;
        }
      }
      if (state.every((v, i) => v === this.target[i])) {
        if (presses < min) min = presses;
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
