import {loadPuzzleInput} from '../lib/load_file'

export function part1(example=false) {
  const inp = loadPuzzleInput("15", example, "2020");

  const numbers = inp[0].split(",").map(x => parseInt(x));

  const memory: {[k: number]: number[]} = {};

  numbers.forEach((num, idx) => {
    memory[num] = [idx];
  });

  let lastNum = numbers[numbers.length - 1];
  for (let i = numbers.length; i < 2020; i++) {
    if (memory[lastNum].length == 2) {
      const curNum = memory[lastNum][1] - memory[lastNum][0];
      memory[lastNum].shift();
      if (!memory[curNum]) {
        memory[curNum] = [];
      }
      memory[curNum].push(i);
      lastNum = curNum;
    } else {
      memory[0].push(i);
      lastNum = 0;
    }
  }

  return lastNum;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("15", example, "2020");

  return lastNum;
}
