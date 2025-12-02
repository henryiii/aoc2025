import { solver_a } from "./utils.js";

export function solve_a(input: string): number {
  const lines = input.split("\n").map(Number);
  return lines.reduce((a, b) => a + b, 0);
}

// Print to stdout
solver_a(0, solve_a);
