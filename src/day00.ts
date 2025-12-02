export function solve_a(input: string): number {
  const lines = input.split("\n").map(Number);
  return lines.reduce((a, b) => a + b, 0);
}
