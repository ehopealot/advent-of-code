import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  const inp = loadPuzzleInput("1", example, "2023");
  const r = /[a-z]+/gi

  return inp.reduce((acc, l) => {
    const nums = l.replaceAll(r, '');
    const val = parseInt(nums[0] + nums[nums.length-1]);
    return acc + val;
  }, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("1", example, "2023");
  const pairs = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
  };
  const numbers = new Set(Object.values(pairs));

  return inp.reduce((acc, l) => {
    let nums = "";
    for (let i = 0; i < l.length; i++) {
      if (numbers.has(l.charAt(i))) {
        nums += l[i];
      } else {
        Object.keys(pairs).find(k => {
          if (l.substring(i, i + k.length) == k) {
            nums += pairs[k];
            return true;
          }
        });
      }
    }
    const val = parseInt(nums[0] + nums[nums.length-1]);
    return acc + val;
  }, 0);
}
