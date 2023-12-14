import {loadPuzzleInput} from '../lib/load_file';

const calcLoad = (grid: string[][]) => {
  const load = new Array(grid[0].length).fill(0);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'O') {
        load[x] += (grid.length - y);
      }
    }
  }

  return load.reduce((acc, n) => acc + n, 0);
}

const tilt = (grid: string[][], direction: number) => {

  // north
  if (direction === 0) {
    const floor = new Array(grid[0].length).fill(0);
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === '#') {
          floor[x] = y + 1;
        }
        if (grid[y][x] == 'O') {
          grid[y][x] = '.';
          grid[floor[x]][x] = 'O';
          floor[x] += 1;
        }
      }
    }
  } else if (direction === 1) {
    // west
    // floors are x values increasing from 0
    const floor = new Array(grid[0].length).fill(0);
    for (let x = 0; x < grid[0].length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] === '#') {
          floor[y] = x + 1;
        }
        if (grid[y][x] === 'O') {
          grid[y][x] = '.';
          grid[y][floor[y]] = 'O';
          floor[y] += 1;
        }
      }
    }
  } else if (direction === 2) {
    // floors are y values decreasing from the end
    const floor = new Array(grid.length).fill(grid.length - 1);
    for (let y = grid.length - 1; y >=0; y--) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === '#') {
          floor[x] = y - 1;
        }
        if (grid[y][x] === 'O') {
          grid[y][x] = '.';
          grid[floor[x]][x] = 'O';
          floor[x] -= 1;
        }
      }
    }
  } else if (direction === 3) {
    //floors are x values decreasing from grid[0].length
    const floor = new Array(grid.length).fill(grid.length - 1);
    for (let x = grid[0].length - 1; x >= 0; x--) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] === '#') {
          floor[y] = x - 1;
        }
        if (grid[y][x] === 'O') {
          grid[y][x] = '.';
          grid[y][floor[y]] = 'O';
          floor[y] -= 1;
        }
      }
    }
  }
  return grid;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("14", example, "2023").map(row => row.split(''));
  tilt(inp, 0);
  console.log(inp.map(row => row.join('')).join('\n'));
  return calcLoad(inp);
}

export function part2(example=false) {
  let inp = loadPuzzleInput("14", example, "2023").map(row => row.split(''));

  const loads: number[] = []
  for (let i = 0; i < 1000; i++) {
    tilt(inp, 0);
    tilt(inp, 1);
    tilt(inp, 2);
    tilt(inp, 3);

    loads.push(calcLoad(inp));
  }

  //console.log(loads);
  // found this cycle by running 1000 cycles and then just searching the printed output... once i found a few numbers repeating it was simple to see what the cycle was. it starts at index 138 and is 14 long:
  // 104667,104663,104650,104649,104640,104651,104662,104671,104659,104654,104645,104644,104647,104666

    // answer is [cycle values][((1000000000 - 1) - cycleStart) % cycleLength]
  console.log([104667,104663,104650,104649,104640,104651,104662,104671,104659,104654,104645,104644,104647,104666][(1000000000 - 1 - 138) % 14])
  console.log(loads.findIndex(item => item === 104667));

  return 0;
}
