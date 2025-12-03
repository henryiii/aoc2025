function highest(arr: number[]): number {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const sum = arr[i] * 10 + arr[j];
      if (sum > max) {
        max = sum;
      }
    }
  }
  return max;
}

export function solve_a(input: string): number {
  const lines = input.split("\n").map((line) => [...line].map(Number));
  return lines.reduce((a, b) => a + highest(b), 0);
}

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

export function solve_b(input: string): number {
  const lines = input.split("\n").map((line) => [...line].map(Number));
  return lines.reduce((sum, arr) => {
    return sum + pick(arr, 0, 12);
  }, 0);
}
