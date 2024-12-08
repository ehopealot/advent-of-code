import { inBounds } from '../lib/grid';
import {loadPuzzleInput} from '../lib/load_file';

const vectors = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const directions = ['|', '-', '|', '-'];

const findGuard = (grid: string[][]) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === '^') {
	return [y, x];
      }
    }
  }
}

const runGuard = (grid: string[][]) => {
  let [y, x] = findGuard(grid);
  let vector = 0;
  let moves = 0;
  const flags: number[][] = [];
  for (let y = 0; y < grid.length; y++) {
    flags.push(new Array(grid[y].length).fill(0));
  }
  while (true) {
    if (flags[y][x] & (1 << vector)) {
      // part 2: loop
      return -1;
    }

    if (!flags[y][x]) {
      moves += 1;
    }
    flags[y][x] |= (1 << vector);

    const [dy, dx] = vectors[vector];
    if (!inBounds(grid, y + dy, x + dx)) {
      return moves;
    }
    if (grid[y + dy][x+dx] === '#') {
      vector += 1;
      vector %= 4;
    } else {
      y += dy;
      x += dx;
    }
  }
}

export function part1(example=false) {
  const inp = loadPuzzleInput("6", example, "2024").map(line => line.split(''));
  return runGuard(inp);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("6", example, "2024").map(line => line.split(''));
  let ans = 0;
  for (let y = 0; y < inp.length; y++) {
    for (let x = 0; x < inp[y].length; x++) {
      if (inp[y][x] === '.') {
	inp[y][x] = '#';
	if (runGuard(inp) === -1) {
	  ans += 1;
	}
	inp[y][x] = '.';
      }
    }
  }
  return ans;
}
