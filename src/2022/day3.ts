import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  const inp = loadPuzzleInput("3", example, "2022");

  return inp.reduce((acc, rucksacks) => {
    const part1 = new Set(rucksacks.slice(0, rucksacks.length / 2).split(''));
    const part2 = new Set(rucksacks.slice(rucksacks.length / 2));

    return acc + [...part1].reduce((acc, char) => {
      if (part2.has(char)) {
        let score = 0;
        if (char.toUpperCase() === char) {
          score += char.charCodeAt(0) - 65 + 27;
        } else {
          score += char.charCodeAt(0) - 96;
        }
        return acc + score;
      }
      return acc;
    }, 0);
  }, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("3", example, "2022");

  let total = 0;
  for (let i = 0; i < inp.length; i += 3) {
    const elf1 = new Set(inp[i]);
    const elf2 = new Set(inp[i+1]);
    const elf3 = new Set(inp[i+2]);

    total += [...elf1].reduce((acc, char) => {
      if (elf2.has(char) && elf3.has(char)) {
        let score = 0;
        if (char.toUpperCase() === char) {
          score += char.charCodeAt(0) - 65 + 27;
        } else {
          score += char.charCodeAt(0) - 96;
        }
        return acc + score;
      }
      return acc;
    }, 0);
  }
  return total;
}
