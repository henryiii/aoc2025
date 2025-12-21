# Copilot Instructions for aoc2025

## Repository Overview

This is an **Advent of Code 2025** solutions repository written in
**TypeScript**. The codebase is small (~1200 lines total) and uses modern
bun tooling with bun 1.3.5 as the package manager. Each day's puzzle has its own
source file (`src/dayXX.ts`) with corresponding test file
(`tests/dayXX.test.ts`).

**Key Details:**

- Language: TypeScript (ESNext target)
- Package Manager: **bun 1.3.5** (required - npm won't work correctly)
- Runtime: bun 1.3.5
- Test Framework: Bun v1.3.5 built-in test runner
- Linter: ESLint v9 with TypeScript strict rules
- Formatter: Prettier v3.7.3

## Essential Build Commands

**CRITICAL: Always run commands in this exact order to avoid issues.**

### Initial Setup

```bash
# Install bun globally if not available (required for this project)
curl -fsSL https://bun.sh/install | bash

# Install dependencies - ALWAYS run this first after cloning
bun install
```

### Development Commands

```bash
# Run a specific day's solution (requires input file in inputs/dayXX.txt)
bun day <number>         # Example: bun day 1

# Create a new day's files (source, test, and empty input)
bun newday <number>      # Example: bun newday 11

# Run tests (use "run" to avoid watch mode)
bun test                 # Run all tests once

# Lint code (must pass for CI)
bun lint                 # Check for lint errors

# Format code (recommended to run before committing)
bun format               # Auto-format all files with Prettier

# Start a TypeScript REPL for debugging
bun tsx
# Then in REPL: const { Grid } = await import("./src/grid.ts");
```

### CI Validation Workflow

The GitHub Actions CI (`.github/workflows/test.yml`) runs on all PRs and main
branch pushes:

1. Checkout code
2. Setup bun (using bun.sh/install)
3. Setup Node.js v20 with bun cache
4. Run `bun install`
5. Run `bun test` (runs `bun` built-in test runner)

## Project Structure

```
aoc2025/
├── .github/
│   └── workflows/
│       └── test.yml          # CI workflow (pnpm install + test)
├── src/
│   ├── dayXX.ts             # Solution files (day00-day10 exist)
│   │                        # Each exports solve_a() and solve_b()
│   ├── grid.ts              # Grid utility class with helpers
│   ├── utils.ts             # readInput(), solver_a(), solver_b()
│   ├── run.ts               # Entry point for pnpm day command
│   └── newday.ts            # Template generator for new days
├── tests/
│   ├── dayXX.test.ts        # Vitest tests for each day
│   └── grid.test.ts         # Tests for Grid utility
├── inputs/
│   ├── .gitignore           # Ignores *.txt except day00.txt
│   └── dayXX.txt            # Input files (gitignored, not in repo)
├── package.json             # Scripts and dependencies
├── tsconfig.json            # TypeScript config (strict mode)
├── eslint.config.mjs        # ESLint flat config (strict + stylistic)
├── .prettierignore          # Ignores pnpm-lock.yaml
└── .gitignore              # Standard Node ignores (node_modules, etc.)
```

### Key Files

**`src/utils.ts`**: Contains `readInput(day)` that reads from
`inputs/dayXX.txt`, `solver_a()` and `solver_b()` that call solve functions with
input.

**`src/grid.ts`**: Reusable 2D grid utility class with:

- `Grid.fromRows(strings[])` - Parse grid from string array
- `grid.get(row, col)` / `grid.at([row, col])` - Access cells
- `grid.forEach()`, `grid.map()`, `grid.reduce()` - Iterators
- `neighbors([row, col])` - Get all 8 neighboring coordinates

**`src/run.ts`**: Dynamically imports `dayXX.ts` based on argument and runs
solve_a/solve_b.

**`src/newday.ts`**: Generates boilerplate for new day with template solve
functions and test.

### Code Patterns

**Day Solution Structure:**

```typescript
export function solve_a(input: string): number {
  return input.split("\n").map(...).reduce(...);
}

export function solve_b(input: string): number {
  // Similar pattern
}
```

**Test Structure:**

```typescript
import { describe, test, expect } from "bun:test";
import { solve_a, solve_b } from "../src/dayXX";

const input = `...`.trim(); // Inline example input

describe("dayXX examples", () => {
  test("First example", () => {
    expect(solve_a(input)).toBe(expected);
  });
});
```

## Common Issues and Solutions

### Input Files

- Input files are gitignored (except day00.txt as template)
- Running `bun day X` without `inputs/dayXX.txt` will fail with ENOENT error
- Use `bun newday X` to create the empty input file, then populate it

### Module Resolution

- Project uses `"type": "module"` in package.json (ESM)
- All imports must use `.js` extension even for `.ts` files (TypeScript
  convention)
- Example: `import { solver_a } from "./utils.js"`

### TypeScript Configuration

- Strict mode enabled (`"strict": true`)
- Target: ESNext, Module: ESNext
- `@types/bun` is installed

### Linting

- Uses ESLint flat config format (`.mjs`)
- Strict TypeScript rules + stylistic rules
- Prettier integration (no formatting conflicts)

## Making Changes

### Adding a New Day

1. Run `bun newday <N>` to generate template files
2. Edit `inputs/dayN.txt` with puzzle input (where N is padded, e.g., day01.txt)
3. Implement `solve_a()` and `solve_b()` in `src/dayN.ts` (e.g., day01.ts)
4. Update tests in `tests/dayN.test.ts` with examples from puzzle
5. Run `bun test` to verify
6. Run `bun lint` and `bun format` before committing

### Modifying Existing Code

1. Make targeted changes to specific files
2. Run `bun test` to ensure tests still pass
3. Run `bun lint` to check for errors
4. Run `bun format` to auto-format
5. Verify with `bun day <N>` if changing solution logic

### Testing Utilities (Grid, Utils)

- These have dedicated test files in `tests/`
- Any changes to `src/grid.ts` or `src/utils.ts` should maintain backward
  compatibility
- Run full test suite: `bun test`

## Trust These Instructions

These instructions have been validated by running all commands and exploring the
codebase thoroughly. Only perform additional searches if:

- You need to understand specific algorithm logic in a day's solution
- The instructions appear outdated (check git history/recent changes)
- You encounter an error not documented here

For routine development (adding days, fixing bugs, refactoring), follow these
instructions directly to minimize exploration time.
