// This is needed to make linters happy, tsx supports top-level await
export {};

const day = process.argv[2] || '00';

if (!day.match(/^\d{2}$/)) {
  console.error('Please provide a valid day in the format "dd"');
  process.exit(1);
}

await import(`./day${day}.ts`);