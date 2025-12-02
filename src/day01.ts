type Direction = "L" | "R";

interface Instruction {
  kind: Direction;
  value: number;
}

function movement(instr: Instruction): number {
  return instr.kind === "R" ? instr.value : -instr.value;
}

const mod100 = (n: number) => ((n % 100) + 100) % 100;

function parseLine(line: string): Instruction {
  const dir = line[0] as Direction;
  const value = Number(line.slice(1));
  return { kind: dir, value };
}

export function solve_a(input: string): number {
  return input
    .split("\n")
    .map(parseLine)
    .reduce(
      ({ dial, count }, instr) => {
        const move = movement(instr);
        const newDial = mod100(dial + move);
        return {
          dial: newDial,
          count: count + (newDial === 0 ? 1 : 0),
        };
      },
      { dial: 50, count: 0 },
    ).count;
}

export function solve_b(input: string): number {
  const lines = input.split("\n").map(parseLine);
  let dial = 50;
  let count = 0;
  for (const line of lines) {
    const move = movement(line);
    const new_dial = dial + move;

    if (move > 0) {
      count += Math.floor(new_dial / 100) - Math.floor(dial / 100);
    } else {
      count += Math.floor((dial - 1) / 100) - Math.floor((new_dial - 1) / 100);
    }
    dial = mod100(new_dial);
  }
  return count;
}
