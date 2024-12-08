import { inBounds, neighborVisit } from '../lib/grid';
import {loadPuzzleInput} from '../lib/load_file';

const xmas = ['X','M','A','S'];

const findXmas = (grid: string[][]) => {
  let hits = 0;
  const checkSquare = (y: number, x: number) => {
    neighborVisit(grid, y, x, (newY, newX, dy, dx) => {
      for (let i = 1; i < 4; i++) {
	if (!inBounds(grid, newY, newX) || grid[newY][newX] !== xmas[i]) {
	  return false;
	}
	newY += dy;
	newX += dx;
      }
      hits += 1;
    });
  }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'X') {
	checkSquare(y, x);
      }
    }
  }
  return hits;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("4", example, "2024").map(line => line.split(''));
  return findXmas(inp);
}

const findx_mas = (grid: string[][]) => {
  let hits = 0;

  const downRight = [[-1, -1], [1, 1]];
  const upRight = [[1, -1], [-1, 1]];
  const checkSquare = (y: number, x: number) => {
    return [downRight, upRight].every(moves => {
      const mAnds = new Set(['M', 'S']);
      moves.forEach(([dy, dx]) => {
	const [newY, newX] = [y + dy, x + dx];
	if (inBounds(grid, newY, newX)) {
	  mAnds.delete(grid[newY][newX]);
	}
      });
      return mAnds.size === 0;
    })
  }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === 'A') {
	hits += checkSquare(y, x) ? 1 : 0;
      }
    }
  }
  return hits;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("4", example, "2024").map(line => line.split(""));
  return findx_mas(inp);
}
