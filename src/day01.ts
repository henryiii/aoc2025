import { solver_a } from "./utils.js";


type Instruction = 
  | { kind: "L"; value: number }
  | { kind: "R"; value: number };

function parseLine(line: string): Instruction {
  const dir = line[0] as 'L' | 'R'
  const value = Number(line.slice(1))
  return { kind: dir, value }
}

export function solve_a(input: string): number {
  const lines = input.split("\n").map(parseLine);
  let dial = 50;
  let count = 0;
  for (const line of lines) {
    if (line.kind === "L") {
      dial = (dial - line.value + 100) % 100;
    } else {
      dial = (dial + line.value) % 100;
    }
    if (dial == 0) {
      count += 1;
    }
  }
  return count;
}

// Print to stdout
solver_a(1, solve_a);
