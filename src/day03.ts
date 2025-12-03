function pick(arr: Uint8Array, k: number): number {
  if (k === 0) return 0;

  const end = arr.length - k;

  for (let d = 9; d >= 0; d--) {
    for (let i = 0; i <= end; i++) {
      if (arr[i] === d) {
        return d * 10 ** (k - 1) + pick(arr.subarray(i + 1), k - 1);
      }
    }
  }

  throw new Error("unreachable");
}

function parse(input: string): Uint8Array[] {
  return input
    .split("\n")
    .map((line) => Uint8Array.from(line, (char) => parseInt(char, 10)));
}

export function solve_a(input: string): number {
  return parse(input).reduce((a, b) => a + pick(b, 2), 0);
}

export function solve_b(input: string): number {
  return parse(input).reduce((sum, arr) => sum + pick(arr, 12), 0);
}
