type Instruction = 
  | { kind: "L"; value: number }
  | { kind: "R"; value: number };

function parseLine(line: string): Instruction {
  const dir = line[0] as 'L' | 'R'
  const value = Number(line.slice(1))
  return { kind: dir, value }
}

export function solve_a(input: string): number {
  const lines = input.split("\n").map(parseLine);
  let dial = 50;
  let count = 0;
  for (const line of lines) {
    const movement = line.kind === "R" ? line.value : -line.value;
    dial = (dial + movement + 100) % 100;
    if (dial == 0) {
      count += 1;
    }
  }
  return count;
}

export function solve_b(input: string): number {
  const lines = input.split("\n").map(parseLine);
  let dial = 50;
  let count = 0;
  for (const line of lines) {
    const movement = line.kind === "R" ? line.value : -line.value;
    const new_dial = dial + movement;
    
    if (movement > 0) {
      count += Math.floor(new_dial / 100) - Math.floor(dial / 100);
    } else {
      count += Math.floor((dial - 1) / 100) - Math.floor((new_dial - 1) / 100);
    }
    dial = ((new_dial % 100) + 100) % 100;
  }
  return count;
}