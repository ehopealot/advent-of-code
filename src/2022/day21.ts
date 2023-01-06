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
  let rootM1 = "";
  let rootM2 = "";
  inp.forEach(line => {
    const [name, job] = line.split(': ');
    const splitJob = job.split(' ');
    if (splitJob.length === 1) {
      monkeys[name] = {
        eval: () => parseInt(splitJob[0]),
      }
    } else {
      const [m1, opStr, m2] = splitJob;
      const op = ops[opStr];
      monkeys[name] = {
        eval: () => op(monkeys[m1].eval(), monkeys[m2].eval()),
      }
      if (name === 'root') {
        rootM1 = m1;
        rootM2 = m2;
      }
    }
  });
  return {monkeys, rootM1, rootM2};
}

export function part1(example=false) {
  const inp = loadPuzzleInput("21", example, "2022");

  const {monkeys} = parseMonkeys(inp);
  return monkeys['root'].eval();
}

export function part2(example=false) {
  const inp = loadPuzzleInput("21", example, "2022");


  const {monkeys, rootM1, rootM2} = parseMonkeys(inp);

  // found these by injecting successively higher 10^n values for humn
  let start = 1000000000000;
  let end = 10000000000000;

  // binary search..
  for (let i = 0;; i++) {
    monkeys['humn'].eval = () => start + Math.floor((end - start) / 2)
    const val = monkeys[rootM1].eval() - monkeys[rootM2].eval();
    if (val < 0) {
      // too big
      end = start + Math.floor((end - start) / 2);
    } else if (val > 0) {
      // too small
      start = start + Math.floor((end - start) / 2);
    } else {
      return start + Math.floor((end - start) / 2);
    }
  }
}
