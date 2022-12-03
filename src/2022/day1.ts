import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  const inp = loadPuzzleInput("1", example, "2022", false)[0].split(/\r\n|\n/);

  let total = 0;
  const elves: number[] = [];

  inp.forEach(line => {
    if (line === '') {
      elves.push(total);
      total = 0;
    } else {
      total += parseInt(line);
    }
  });
  return Math.max(...elves);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("1", example, "2022", false)[0].split(/\r\n|\n/);

  let total = 0;
  const elves: number[] = [];

  inp.forEach(line => {
    if (line === '') {
      elves.push(total);
      total = 0;
    } else {
      total += parseInt(line);
    }
  });

  elves.sort((a, b) => b-a);

  return elves.slice(0, 3).reduce((acc, num) => acc + num, 0);
}
