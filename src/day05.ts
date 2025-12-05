class Range {
  constructor(
    public min: number,
    public max: number,
  ) {}

  contains(n: number): boolean {
    return n >= this.min && n <= this.max;
  }

  get length(): number {
    return this.max - this.min + 1;
  }
}

function merge_ranges(ranges: Range[]): Range[] {
  const sorted = [...ranges].sort((a, b) => a.min - b.min);
  const merged: Range[] = [];

  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range.min <= last.max + 1) {
      last.max = Math.max(last.max, range.max);
    } else {
      merged.push(new Range(range.min, range.max));
    }
  }

  return merged;
}

function ranges_ingredients(input: string): [Range[], number[]] {
  const [ranges_str, ingredients_str] = input.split("\n\n");
  const ranges = ranges_str.split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return new Range(min, max);
  });
  const ingredients = ingredients_str.split("\n").map(Number);
  return [ranges, ingredients];
}

export function solve_a(input: string): number {
  const [ranges, ingredients] = ranges_ingredients(input);
  return ingredients.reduce(
    (sum, ingredient) =>
      sum + (ranges.some((range) => range.contains(ingredient)) ? 1 : 0),
    0,
  );
}

export function solve_b(input: string): number {
  const [ranges] = ranges_ingredients(input);
  const merged = merge_ranges(ranges);
  return merged.reduce((sum, range) => sum + range.length, 0);
}
