# AoC 2025

After two years of Rust, I'm doing this year in TypeScript. I started by asking
ChatGPT for help getting setup, but then I didn't follow it that closely because
I wanted to use modern tooling like pnpm, and it was inconsistent about giving
me modern recommendations. It was great for asking about why vscode didn't
recognize `process` and things like that, though. I later switched to bun based
on a recommendation from a colleague, and also changed `vitest` to `bun:test`.

First, install bun; this is a runtime (replaces nodejs) and a package manager
(replaced npm/yarn/pnpm):

```bash
brew tap oven-sh/bun
brew install bun
```

I started with a minimal setup (see git history). I generated the
`package.json` with `pnpm init`. I installed and added typescript and tsx with
`pnpm install --save-dev typescript tsx`. Eventually this moved to bun. You'll
need to run:

```bash
bun install
```

For vscode, I did need to change the package manager in the "npm" section to
"pnpm" (then "bun") from "auto".

I also needed to run `pnpm add -D @types/node`, to teach typescript that it is
targeting node; this fixed vscode's tooling to recognize `process` as an
object.  Later I switched to `bun add -D @types/bun`. I added the tsconfig from
<https://bun.com/docs/typescript>.

You can run a day with:

```bash
bun day 0
```

Tests are run with:

```bash
bun test
```

For linting and formatting, I installed prettier and eslint. You can run them:

```bash
bun format && bun lint
```

I used ChatGPT to help write some portions of the code, with lots of guidance.
This helped me not have to look up things like how to write `log10`.

To start up a REPL, type:

```console
$ bun tsx
> const { Grid } = await import("./src/grid.ts");
```

