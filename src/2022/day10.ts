import {loadPuzzleInput} from '../lib/load_file';


export function part1(example=false) {
  const inp = loadPuzzleInput("10", example, "2022");

  let x = 1;
  let cycle = 1;
  let ans = 0;

  const isInteresting = (num: number) => num === 20 || (num <= 220 && num >= 60 && (num - 20) % 40 === 0);

  const incrementCycle = () => {
    cycle += 1;
    if (isInteresting(cycle)) {
      ans += x * cycle;
    }
  }

  inp.forEach((instruction) => {
    if (instruction === 'noop') {
      incrementCycle();
    } else {
      const amount = parseInt(instruction.split(' ')[1]);
      // start of instruction
      incrementCycle();
      // execute instruction
      x += amount;
      incrementCycle();
    }
  });

  return ans;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("10", example, "2022");
  let spritePos = 1;
  let pixel = 0;
  const screen: string[][] = [];

  for (let i = 0; i < 6; i++) {
    screen.push(new Array<string>(40));
  }

  const drawPixel = () => {
    const overlap = Math.abs((spritePos - pixel % 40)) <= 1;
    screen[Math.floor(pixel / 40)][pixel % 40] = overlap ? '#' : '.';
    pixel += 1;
  }

  inp.forEach((instruction) => {
    if (instruction === 'noop') {
      drawPixel();
    } else {
      const amount = parseInt(instruction.split(' ')[1]);
      // start of instruction
      drawPixel();
      // execute instruction
      drawPixel();
      spritePos += amount;
    }
  });

  console.log(screen.map(row => row.join('')).join('\n'));
  return 0;
}
