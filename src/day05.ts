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
  let current = new Range(sorted[0].min, sorted[0].max);

  for (let i = 1; i < sorted.length; i++) {
    const r = sorted[i];

    if (r.min <= current.max + 1) {
      // Overlaps or touches — expand current
      current.max = Math.max(current.max, r.max);
    } else {
      // Disjoint — push current and start new
      merged.push(current);
      current = new Range(r.min, r.max);
    }
  }
  merged.push(current);
  return merged;
}

export function solve_a(input: string): number {
  const [ranges_str, ingredients_str] = input.split("\n\n");
  const ranges = ranges_str.split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return new Range(min, max);
  });
  const ingredients = ingredients_str.split("\n").map(Number);

  return ingredients.reduce((sum, ingredient) => {
    for (const range of ranges) {
      if (range.contains(ingredient)) {
        return sum + 1;
      }
    }
    return sum;
  }, 0);
}

export function solve_b(input: string): number {
  const [ranges_str] = input.split("\n\n");
  const ranges = ranges_str.split("\n").map((line) => {
    const [min, max] = line.split("-").map(Number);
    return new Range(min, max);
  });
  const merged = merge_ranges(ranges);
  return merged.reduce((sum, range) => sum + range.length, 0);
}
