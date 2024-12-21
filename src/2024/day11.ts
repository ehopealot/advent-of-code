import {loadPuzzleInput} from '../lib/load_file';

const runRules = (num: number) => {
  if (num === 0) {
    return [1];
  } else {
    const log10 = Math.floor(Math.log10(num));
    if (log10 % 2 === 1) {
      const divisor = 10 ** Math.ceil(log10 / 2);
      return [Math.floor(num / divisor), num % divisor];
    } else {
      return [num * 2024];
    }
  }
}

export function part1(example=false, blinks=25) {
  const inp = loadPuzzleInput("11", example, "2024")[0].split(' ').map(i => parseInt(i));

  const numStones: {[k: number]: number[]} = {};
  const depth = blinks;
  const recurse = (n: number, curDepth: number) => {
    if (curDepth === 0) {
      return 1;
    }
    if (numStones[n] === undefined) {
      numStones[n] = new Array<number>(depth).fill(0);
    }
    if (numStones[n][depth - curDepth]) {
      return numStones[n][depth - curDepth];
    }
    const next = runRules(n);
    for (let i = 0; i < next.length; i++) {
      numStones[n][depth - curDepth] += (recurse(next[i], curDepth - 1));
    }
    return numStones[n][depth - curDepth];
  }

  return inp.reduce((cur, next) => cur + recurse(next, depth), 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("11", example, "2024")[0].split(' ').map(i => parseInt(i));
  return part1(false, 75);
}
