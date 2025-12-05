class Range {
  constructor(
    public min: number,
    public max: number,
  ) {}

  contains(n: number): boolean {
    return n >= this.min && n <= this.max;
  }
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
