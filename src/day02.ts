type Pair = [number, number];

function* repeatedBlockGenerator(
  start: number,
  stop: number,
  maxLength?: number, // Optional argument
): Generator<number> {
  const minDigits = Math.floor(Math.log10(start)) + 1;
  const maxDigits = Math.floor(Math.log10(stop)) + 1;

  for (let digits = minDigits; digits <= maxDigits; digits++) {
    // Try all repeat counts that divide this digit length
    for (
      let repeatCount = 2;
      repeatCount <= (maxLength ?? digits);
      repeatCount++
    ) {
      if (digits % repeatCount !== 0) continue;

      const blockLen = digits / repeatCount;
      const blockStart = 10 ** (blockLen - 1);
      const blockEnd = 10 ** blockLen - 1;

      for (let block = blockStart; block <= blockEnd; block++) {
        const factor =
          (10 ** (blockLen * repeatCount) - 1) / (10 ** blockLen - 1);
        const candidate = block * factor;

        if (candidate > stop) break;
        if (candidate >= start) {
          yield candidate;
        }
      }
    }
  }
}

export function solve_a(input: string): number {
  return input
    .split(",")
    .map((range) => range.split("-").map(Number) as Pair)
    .flatMap(([start, end]) => [...repeatedBlockGenerator(start, end, 2)])
    .reduce((acc, rep) => acc + rep, 0);
}

export function solve_b(input: string): number {
  return input
    .split(",")
    .flatMap((range) => {
      const [start, end] = range.split("-").map(Number);
      return [...new Set(repeatedBlockGenerator(start, end))];
    })
    .reduce((sum, n) => sum + n, 0);
}
