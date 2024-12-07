import {loadPuzzleInput} from '../lib/load_file';

const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
const numbers = /(\d+)/g;

export function part1(example=false) {
  const inp = loadPuzzleInput("3", example, "2024");
  const program = inp.join('');
  const commands = program.match(regexp);
  return commands.reduce((acc, command) => {
    const nums = command.match(numbers).map(i => parseInt(i));
    return acc + nums[0] * nums[1];
  }, 0);
}

const regexp2 = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

export function part2(example=false) {
  const inp = loadPuzzleInput("3", example, "2024");

  const program = inp.join('');
  const commands = program.match(regexp2);
  let enabled = true;
  return commands.reduce((acc, command) => {
    if (command === "do()") {
      enabled = true;
      return acc;
    } else if (command === "don't()") {
      enabled = false;
      return acc;
    } else if (enabled) {
      const nums = command.match(numbers).map(i => parseInt(i));
      return acc + nums[0] * nums[1];
    } else {
      return acc
    }
  }, 0);
}
