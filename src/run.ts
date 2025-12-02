// This is needed to make linters happy, tsx supports top-level await
export {};

import { solver_a, solver_b } from "./utils.js";

const day = process.argv[2] || '0';
const padded_day = String(day).padStart(2, "0");

const mod = await import(`./day${padded_day}.ts`);

if (typeof mod.solve_a === "function") {
    solver_a(Number(day), mod.solve_a);
}
if (typeof mod.solve_b === "function") {
    solver_b(Number(day), mod.solve_b);
}