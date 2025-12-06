export function solve_a(input: string): number {
  const lines = input.split("\n").map(Number);
  return lines.reduce((a, b) => a + b, 0);
}

export function solve_b(input: string): number {
  const lines = input.split("\n").map(Number);
  return lines.reduce((a, b) => a + b, 0);
}
