import {loadPuzzleInput} from '../lib/load_file';

const parseGrid = (inp: string[]) => (
  inp.map(line => line.split(''))
)

const findSquare = (square: string, grid: string[][]) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === square) {
        return [y, x];
      }
    }
  }
}

const scoreSquare = (inp: string) => {
  return inp === 'S' ? 0 : (inp === 'E' ? 25 : inp.charCodeAt(0) - 97)
}

type Path = {
  x: number;
  y: number;
  length: number;
}

const inBounds = (y: number, x: number, grid: string[][]) => {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length
};

const walkGrid = (grid: string[][], y: number, x: number, reverse: boolean) => {
  const queue = new Array<Path>();
  queue.push({y, x, length: 0});
  const moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const shortestToPoint: number[][] = [];
  for (let i = 0; i < grid.length; i++) {
    shortestToPoint.push((new Array<number>(grid[i].length)).fill(Number.MAX_SAFE_INTEGER));
  }

  shortestToPoint[y][x] = 0;
  while (queue.length > 0) {
    const top = queue.shift();
    for (let i = 0; i < moves.length; i++) {
      const [y, x] = [top.y + moves[i][0], top.x + moves[i][1]];
      if (inBounds(y, x, grid) && top.length + 1 < shortestToPoint[y][x] && (reverse ? scoreSquare(grid[y][x]) - scoreSquare(grid[top.y][top.x]) >= -1 : scoreSquare(grid[top.y][top.x]) - scoreSquare(grid[y][x]) >= -1)) {
        if ((reverse && grid[y][x] === 'a') || (!reverse && grid[y][x] === 'E')) {
          return top.length + 1;
        }
        shortestToPoint[y][x] = top.length + 1;
        queue.push({y, x, length: top.length + 1});
      }
    };
  }
  return Number.MAX_SAFE_INTEGER;
}

export function part1(example=false) {
  const grid = parseGrid(loadPuzzleInput("12", example, "2022"));

  let [y, x] = findSquare('S', grid);

  return walkGrid(grid, y, x, false);
}

export function part2(example=false) {
  const grid = parseGrid(loadPuzzleInput("12", example, "2022"));

  let [y, x] = findSquare('E', grid);

  return walkGrid(grid, y, x, true);
}
