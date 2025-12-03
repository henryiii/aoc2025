function pick(arr: number[], start: number, k: number): number {
  if (k === 0) return 0;

  const end = arr.length - k;

  for (let d = 9; d >= 0; d--) {
    for (let i = start; i <= end; i++) {
      if (arr[i] === d) {
        return d * 10 ** (k - 1) + pick(arr, i + 1, k - 1);
      }
    }
  }

  throw new Error("unreachable");
}

function parse(input: string): number[][] {
  return input.split("\n").map((line) => [...line].map(Number));
}

export function solve_a(input: string): number {
  return parse(input).reduce((a, b) => a + pick(b, 0, 2), 0);
}

export function solve_b(input: string): number {
  return parse(input).reduce((sum, arr) => sum + pick(arr, 0, 12), 0);
}
