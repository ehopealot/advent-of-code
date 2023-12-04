import {loadPuzzleInput} from '../lib/load_file';

const neighbors = (grid: string[][], y: number, x: number): [number, number][] => {
  const moves = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

  return moves.reduce((neighbors, [dy, dx]) => {
    const newY = y + dy;
    const newX = x + dx;
    if (newY < grid.length && newY >= 0 &&
      newX < grid[0].length && newX >= 0) {
      return [...neighbors, [newY, newX]];
    }
    return neighbors;
  }, new Array<[number, number]>);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("3", example, "2023");
  const grid = inp.map(line => line.split(''));

  const foundNumbers: {[k: string]: number} = {};

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.match(/[^(\d|\.)]/)) {
        // symbol
        neighbors(grid, y, x).forEach(([nY, nX]) => {
          if (grid[nY][nX].match(/\d/)) {
            let n = grid[nY][nX];
            let i = nX + 1;
            for (; grid[nY][i]?.match(/\d/); i++) {
              n += grid[nY][i];
            }
            i = nX - 1;
            for (; grid[nY][i]?.match(/\d/); i--) {
              n = grid[nY][i] + n;
            }
            foundNumbers[`${nY},${i+1}`] = parseInt(n);
          }
        });
      }
    });
  });

  console.log(foundNumbers);
  return Object.values(foundNumbers).reduce((acc, num) => acc + num, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("3", example, "2023");
  const grid = inp.map(line => line.split(''));

  let ratios = 0;
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.match(/\*/)) {
        // symbol
        const foundNumbers: {[k: string]: number} = {};

        neighbors(grid, y, x).forEach(([nY, nX]) => {
          if (grid[nY][nX].match(/\d/)) {
            let n = grid[nY][nX];
            let i = nX + 1;
            for (; grid[nY][i]?.match(/\d/); i++) {
              n += grid[nY][i];
            }
            i = nX - 1;
            for (; grid[nY][i]?.match(/\d/); i--) {
              n = grid[nY][i] + n;
            }
            foundNumbers[`${nY},${i+1}`] = parseInt(n);
          }
        });

        if (Object.keys(foundNumbers).length == 2) {
          ratios += Object.values(foundNumbers).reduce((acc, n) => acc * n, 1);
        }
      }
    });
  });
  return ratios;
}
