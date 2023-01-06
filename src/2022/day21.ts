import {loadPuzzleInput} from '../lib/load_file';

type Monkey = {
  eval: () => number
}

const ops = {
  '+': (m1: number, m2: number) => m1 + m2,
  '-': (m1: number, m2: number) => m1 - m2,
  '*': (m1: number, m2: number) => m1 * m2,
  '/': (m1: number, m2: number) => m1 / m2,
}

function parseMonkeys(inp: Array<string>) {
  const monkeys: {[k: string]: Monkey} = {};
  inp.forEach(line => {
    const [name, job] = line.split(': ');
    const splitJob = job.split(' ');
    if (splitJob.length === 1) {
      monkeys[name] = {
        eval: () => parseInt(splitJob[0])
      }
    } else {
      const [m1, opStr, m2] = splitJob;
      const op = ops[opStr];
      monkeys[name] = {
        eval: () => op(monkeys[m1].eval(), monkeys[m2].eval()),
      }
    }
  });
  return monkeys;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("21", example, "2022");

  const monkeyTree = parseMonkeys(inp);
  return monkeyTree['root'].eval();
}

export function part2(example=false) {
  const inp = loadPuzzleInput("21", example, "2022");
  return 0;
}
