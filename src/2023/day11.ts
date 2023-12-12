import {loadPuzzleInput} from '../lib/load_file';

const expand = (universe: string[][]) => {
  const emptyRows = [];
  let galaxyNum = 1;
  for (let y = 0; y < universe.length; y++) {
    let empty = true;
    for (let x = 0; x < universe[0].length; x++) {
      if (universe[y][x] === '#') {
        empty = false;
        universe[y][x] = galaxyNum.toString();
        galaxyNum++;
      }
    }
    if (empty) { emptyRows.push(y) };
  }
  const emptyCols = [];
  for (let x = 0; x < universe[0].length; x++) {
    let empty = true;
    for (let y = 0; y < universe.length; y++) {
      if (universe[y][x] != '.') {
        empty = false;
        break;
      }
    }
    if (empty) { emptyCols.push(x) }
  }

  return {numGalaxies: galaxyNum - 1, emptyRows: new Set(emptyRows), emptyCols: new Set(emptyCols)};
}

const findStart = (universe: string[][], start: string) => {
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe[0].length; x++) {
      if (universe[y][x] === start) {
        return {y, x};
      }
    }
  }
}

const bfs = (universe: string[][], numGalaxies: number, emptyRows: Set<number>, emptyCols: Set<number>, expansionFactor = 2) => {
  const distances: {[k: string]: number} = {};
  console.log(numGalaxies);
  for (let g = 1; g < numGalaxies + 1; g++) {
    const {y, x} = findStart(universe, g.toString());
    const queue: number[][] = [[y, x, 0]];
    const visited = universe.map(row => new Array(row.length).fill(false));
    visited[y][x] = true;
    while (queue.length) {
      const [y, x, steps] = queue.shift();
      const cell = universe[y][x];
      if (cell !== '.') {
        if (g.toString() !== cell) {
          // found one
          const key = [g, parseInt(cell)].sort((a, b) => a - b).join('->');
          distances[key] = steps;
        }
      }
      [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(([dy, dx]) => {
        const newY = y + dy;
        const newX = x + dx;
        let addnlSteps = 1;
        if (universe[newY] && universe[newY][newX]) {
          if (dy != 0 && emptyRows.has(newY)) {
            addnlSteps *= expansionFactor;
          }
          if (dx != 0 && emptyCols.has(newX)) {
            addnlSteps *= expansionFactor
          }
          const nextSteps = steps + addnlSteps;
          if (!visited[newY][newX]) {
            visited[newY][newX] = true;
            queue.push([newY, newX, nextSteps]);
          }
        }
      });
    }
  }
  return Object.values(distances).reduce((acc, d) => d + acc, 0);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("11", example, "2023").map(line => line.split(''));
  const {numGalaxies, emptyRows, emptyCols} = expand(inp);
  return bfs(inp, numGalaxies, emptyRows, emptyCols);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("11", example, "2023").map(line => line.split(''));
  const {numGalaxies, emptyRows, emptyCols} = expand(inp);
  return bfs(inp, numGalaxies, emptyRows, emptyCols, 1000000);
}
