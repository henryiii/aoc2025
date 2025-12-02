type Pair = [number, number];

function* repeatedDigitGenerator(start: number, stop: number): Generator<number> {
  const minDigits = Math.floor(Math.log10(start)) + 1;
  const maxDigits = Math.floor(Math.log10(stop)) + 1;

  // Only even digit counts matter
  for (let digits = minDigits; digits <= maxDigits; digits++) {
    if (digits % 2 !== 0) continue;

    const halfDigits = digits / 2;
    const pow = 10 ** halfDigits;

    const halfStart = Math.max(10 ** (halfDigits - 1), Math.floor(start / pow));
    const halfEnd   = Math.min(10 ** halfDigits - 1, Math.floor(stop / pow));

    for (let half = halfStart; half <= halfEnd; half++) {
      const candidate = half * (pow + 1);
      if (candidate >= start && candidate <= stop) {
        yield candidate;
      }
    }
  }
}

export function solve_a(input: string): number {
  const pairs = input.split(",").map(range => {
    const [start, end] = range.split("-").map(Number);
    return [start, end] as Pair;
  });
  return pairs.reduce((acc, [start, end]) => {
    for (const rep of repeatedDigitGenerator(start, end)) {
      acc += rep;
    }
    return acc;
  }, 0);
}
