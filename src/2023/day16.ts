import {loadPuzzleInput} from '../lib/load_file';

const reflectAll = (grid: string[][]) => {
  let m = 0;
  for (let y = 0; y < grid.length; y++) {
    // go left to right
    m = Math.max(m, reflect(grid, [y, -1, 1]));
    // go right to left
    m = Math.max(m, reflect(grid, [y, grid.length, 3]));
  }
  for (let x = 0; x < grid[0].length; x++) {
    // top to bottom
    m = Math.max(m, reflect(grid, [-1, x, 2]));
    // bottom to top
    m = Math.max(m, reflect(grid, [grid.length, x, 0]));
  }
  return m;
}

const reflect = (grid: string[][], startAt?: [number, number, number]) => {
  // y, x, direction. directions 0: up, 1: right, 2: down, 3: left
  startAt = startAt || [0, -1, 1];
  const s = new Set<string>();
  let beams: [number, number, number, Set<string>][] = [[...startAt, s]];
  const key = (y: number, x: number, d: number) => `${y},${x},${d}`;
  const paths: {[k: string]: Set<string>} = {[key(...startAt)]: s};
  const moves = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1],
  };
  const inbounds = (y: number, x: number) => (
    y < grid.length && y >= 0 && x < grid[0].length && x >= 0
  );

  const followPath = (y: number, x: number, direction: number) => {
    const k = key(y, x, direction);
    if (!paths[k]) {
      const newPath = new Set<string>();
      beams.push([y, x, direction, newPath]);
      paths[k] = newPath;
    }
  }
  while (beams.length) {
    let [y, x, direction, path] = beams.shift();
    const [dy, dx] = moves[direction];
    path.add(key(y, x, direction));
    if (inbounds(y+dy, x+dx)) {
      y += dy;
      x += dx;

      const next = grid[y][x];
      let pathSplit = false;
      if (next === '/') {
        if (direction % 2 === 0) {
          // turn right
          direction++;
        } else {
          direction--;
        }
      } else if (next === '\\') {
        if (direction % 2 === 0) {
          direction--;
        } else {
          direction++;
        }
      } else if (next === '|' && (direction === 1 || direction === 3)) {
        // "original" goes up
        direction = 0
        // "clone" goes the other way
        followPath(y, x, 2);
        pathSplit = true;
      } else if (next === '-' && (direction === 0 || direction === 2)) {
        // "original" goes right
        direction = 1;
        // "clone" goes the other way
        followPath(y, x, 3);
        pathSplit = true;
      }
      direction = (direction + 4) % 4;
      if (pathSplit) {
        followPath(y, x, direction);
      } else {
        beams.push([y, x, direction, path]);
      }
    }
  }
  // hax: just take the size of the set of all the keys minus direction
  const allCells = Object.values(paths).reduce((acc, path) => {
    const trimmedCells = [...path].map(cell => cell.substring(0, cell.lastIndexOf(',')));
    return new Set<string>([...acc, ...trimmedCells]);
  }, new Set<string>());
  // dont include the start point off the grid
  return allCells.size - 1;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("16", example, "2023").map(l => l.split(''));
  return reflect(inp);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("16", example, "2023").map(l => l.split(''));
  return reflectAll(inp);
}
