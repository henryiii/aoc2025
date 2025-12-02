// Can try fs-extra later

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function readInput(day: number | string): string {
  const file = resolve(`inputs/day${String(day).padStart(2, "0")}.txt`);
  return readFileSync(file, "utf8").replace(/\r?\n$/, "");
}

export function solver_a<T>(
  day: number | string,
  fn: (input: string) => T,
): void {
  const input = readInput(day);
  const result = fn(input);
  console.log(`Day ${day} - Part A: ${result}`);
}

export function solver_b<T>(
  day: number | string,
  fn: (input: string) => T,
): void {
  const input = readInput(day);
  const result = fn(input);
  console.log(`Day ${day} - Part B: ${result}`);
}
