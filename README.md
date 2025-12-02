# AoC 2025

After two years of Rust, I'm doing this year in TypeScript. I started by asking
ChatGPT for help getting setup, but then I didn't follow it that closely because
I wanted to use modern tooling like pnpm, and it was inconsistent about giving
me modern recommendations. It was great for asking about why vscode didn't
recognize `process` and things like that, though.

First, I installed pnpm and typescript on my macOS machine:

```bash
brew install pnpm node
```

I started with a minimal setup (see git history). I generated the `package.json`
with `pnpm init`. I installed and added typescript and tsx with `pnpm install
--save-dev typescript tsx`. You'll need to run:

```bash
pnpm install
```

For vscode, I did need to change the package manager in the "npm" section to "pnpm" from "auto".

I also needed to run `pnpm add -D @types/node`, to teach typescript that it is
targeting node; this fixed vscode's tooling to recognize `process` as an
object.

You can run a day with `pnpm start 0`, for example.

Tests are using vitest, and you can run them with:

```bash
pnpm test run
```

Leaving off the `run` will put it into watch mode.

For linting and formatting, I installed prettier and eslint. You can run them:

```bash
pnpm format
pnpm lint
```
