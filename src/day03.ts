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
