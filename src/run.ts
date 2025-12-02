// This is needed to make linters happy, tsx supports top-level await
export {};

const day = process.argv[2] || '0';
const padded_day = String(day).padStart(2, "0");

await import(`./day${padded_day}.ts`);