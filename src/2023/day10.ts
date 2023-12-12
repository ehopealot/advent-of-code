import {loadPuzzleInput} from '../lib/load_file';

const NORTH = [-1, 0];
const EAST = [0, 1];
const SOUTH = [1, 0];
const WEST = [0, -1];

const connections = {
  "|": {
    [NORTH.join('')]: NORTH,
    [SOUTH.join('')]: SOUTH,
  },
  "-": {
    [WEST.join('')]: WEST,
    [EAST.join('')]: EAST,
  },
  "L": {
    [SOUTH.join('')]: EAST,
    [WEST.join('')]: NORTH,
  },
  "J": {
    [EAST.join('')]: NORTH,
    [SOUTH.join('')]: WEST,
  },
  "7": {
    [EAST.join('')]: SOUTH,
    [NORTH.join('')]: WEST,
  },
  "F": {
    [NORTH.join('')]: EAST,
    [WEST.join('')]: SOUTH,
  },
  "S": {
  },
  "X": {
  },
}

const nextStep = (grid: string[][], pos: number[], vector: number[]) => {
  const newPos = [pos[0] + vector[0], pos[1] + vector[1]];
  const next = grid[newPos[0]][newPos[1]];
  const newVector = connections[next][vector.join('')];
  return {pos: newPos, vector: newVector};
}

const walkLoop = (grid: string[][], fill = false) => {
  // get started

  const findStart = () => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 'S') {
          return {y, x};
        }
      }
    }
  };

  const {y, x} = findStart();
  let vector = [NORTH, EAST, SOUTH, WEST].find(([dy, dx]) => {
    if (grid[y+dy]) {
      const next = grid[y+dy][x+dx];
      return (next && next !== '.') && !!(connections[next][`${dy}${dx}`]);
    }
    return false;
  });

  let pos = [y, x];
  let steps = 0;
  do {
    if (fill) {
      grid[pos[0]][pos[1]] = 'X';
    }
    ({pos, vector} = nextStep(grid, pos, vector));
    steps += 1;
  } while (grid[pos[0]][pos[1]] !== (fill ? 'X': 'S'));
  return Math.ceil(steps/2);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("10", example, "2023").map(line => line.split(''));
  return walkLoop(inp);
}

export function part2(example=false) {
  let inp = loadPuzzleInput("10", example, "2023").map(line => line.split(''));
  walkLoop(inp, true);


  // swap out everythuing not in the loop with "."
  inp = loadPuzzleInput("10", example, "2023").map(line => line.split('')).map((line, y) => line.map((cell, x) => inp[y][x] === 'X' ? cell : '.'));

  const checkFor = (char: string) => {
    for (let y = 0; y < inp.length; y++) {
      let pipesUp = 0;
      let pipesDown = 0;
      for (let x = 0; x < inp[0].length; x++) {
        if (inp[y][x] === '|' || inp[y][x] === 'S' || inp[y][x] == 'L' || inp[y][x] === 'J') {
          pipesUp += 1;
        }
        if (inp[y][x] === '|' || inp[y][x] === 'S' || inp[y][x] == 'F' || inp[y][x] === '7') {
          pipesDown += 1;
        }
        if (inp[y][x] !== char) {
          continue;
        }

        if (pipesDown % 2 == 1 && pipesUp % 2 === 1) { inp[y][x] = 'I'};
      }
    }
  }

  checkFor('.');
  console.log(inp.map(line => line.join('')).join('\n'));
  return inp.reduce((acc, line) => acc + line.filter(c => c === 'I').length, 0);
}
