type Pair = [number, number];

function* repeatedDigitGenerator(
  start: number,
  stop: number,
): Generator<number> {
  const minDigits = Math.floor(Math.log10(start)) + 1;
  const maxDigits = Math.floor(Math.log10(stop)) + 1;

  // Only even digit counts matter
  for (let digits = minDigits; digits <= maxDigits; digits++) {
    if (digits % 2 !== 0) continue;

    const halfDigits = digits / 2;
    const pow = 10 ** halfDigits;

    const halfStart = Math.max(10 ** (halfDigits - 1), Math.floor(start / pow));
    const halfEnd = Math.min(10 ** halfDigits - 1, Math.floor(stop / pow));

    for (let half = halfStart; half <= halfEnd; half++) {
      const candidate = half * (pow + 1);
      if (candidate >= start && candidate <= stop) {
        yield candidate;
      }
    }
  }
}

export function solve_a(input: string): number {
  const pairs = input.split(",").map((range) => {
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

function* repeatedBlockGenerator(
  start: number,
  stop: number,
): Generator<number> {
  const minDigits = Math.floor(Math.log10(start)) + 1;
  const maxDigits = Math.floor(Math.log10(stop)) + 1;

  for (let digits = minDigits; digits <= maxDigits; digits++) {
    // Try all repeat counts that divide this digit length
    for (let repeatCount = 2; repeatCount <= digits; repeatCount++) {
      if (digits % repeatCount !== 0) continue;

      const blockLen = digits / repeatCount;
      const blockStart = 10 ** (blockLen - 1);
      const blockEnd = 10 ** blockLen - 1;

      for (let block = blockStart; block <= blockEnd; block++) {
        // Construct candidate using math formula
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

export function solve_b(input: string): number {
  const pairs = input.split(",").map((range) => {
    const [start, end] = range.split("-").map(Number);
    return [start, end] as Pair;
  });
  return pairs.reduce((acc, [start, end]) => {
    for (const rep of new Set(repeatedBlockGenerator(start, end))) {
      acc += rep;
    }
    return acc;
  }, 0);
}
