import { cardinalVisit } from '../lib/grid';
import {loadPuzzleInput} from '../lib/load_file';

const exploreTrailhead = (grid: number[][], y: number, x: number) => {
  const stack: number[][] = [[y,x]];
  const nines = new Set<string>();
  let distinctTrails = 0;
  while (stack.length) {
    const next = stack.pop();
    const target = grid[next[0]][next[1]] + 1;
    cardinalVisit(grid, next[0], next[1], (y, x) => {
      if (grid[y][x] === target) {
	if (target === 9) {
	  nines.add(`${y},${x}`);
	  distinctTrails += 1;
	} else {
	  stack.push([y, x]);
	}
      }
    });
  }
  return {peaks: nines.size, distinctTrails};
}

export function part1(example=false) {
  const inp = loadPuzzleInput("10", example, "2024").map(l => l.split("").map(i => parseInt(i)));

  let score = 0;
  for (let y = 0; y < inp.length; y++) {
    for (let x = 0; x < inp[y].length; x++) {
      if (inp[y][x] === 0) {
	score += exploreTrailhead(inp, y, x).peaks;
      }
    }
  }
  return score;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("10", example, "2024").map(l => l.split("").map(i => parseInt(i)));

  let score = 0;
  for (let y = 0; y < inp.length; y++) {
    for (let x = 0; x < inp[y].length; x++) {
      if (inp[y][x] === 0) {
	score += exploreTrailhead(inp, y, x).distinctTrails;
      }
    }
  }
  return score;
}
