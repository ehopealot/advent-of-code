import {loadPuzzleInput} from '../lib/load_file';


const findMaxCoords = (lines: number[][][]) => {
  let maxX = 0;
  let maxY = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j][0] > maxY) {
        maxY = lines[i][j][0];
      }
      if (lines[i][j][1] > maxX) {
        maxX = lines[i][j][1];
      }
    }
  }
  // max X is pouring position + side length of the 45/45/90 triangle of sand
  return [maxY, 501 + maxY + 2];
}

const buildGrid = (lines: number[][][], maxY: number, maxX: number) => {
  const grid: string[][] = [];
  for (let y = 0; y < maxY + 10; y++) {
    grid.push((new Array<string>(maxX + 10)).fill('.'));
  }

  lines.forEach(line => {
    for (let c = 1; c < line.length; c++) {
      const prev = line[c-1];
      const cur = line[c];

      const [startY, endY] = [prev[0], cur[0]].sort((a,b) => a-b);
      const [startX, endX] = [prev[1], cur[1]].sort((a,b) => a-b);

      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          grid[y][x] = '#';
        }
      }
    }
  });
  return grid;
}

const pourSand = (grid: string[][], maxY: number) => {
  let sandPiled = 0;

  const moves = [[1, 0], [1, -1], [1, 1]];
  while(true) {
    const sand = [0, 500];
    let fall = true;
    while (fall) {
      fall = false;
      for (let m = 0; m < moves.length; m++) {
        const move = moves[m];
        if (grid[sand[0] + move[0]][sand[1] + move[1]] === '.') {
          sand[0] += move[0];
          sand[1] += move[1];
          // keep falling as long as its not past the last wall/floor
          fall = sand[0] < maxY;
          break;
        }
      }
    }
    if (sand[0] < maxY) {
      sandPiled += 1;
      grid[sand[0]][sand[1]] = 'o';
    }
    if (sand[0] === 0 && sand[1] === 500 || sand[0] >= maxY) {
      // part 2 condition || part 1 condition
      return sandPiled;
    }
  }
}

export function part1(example=false) {
  const inp = loadPuzzleInput("14", example, "2022");
  // y, x
  const lines = inp.map(line =>
    line.split(' -> ').map(coord => coord.split(',').reverse().map(n => parseInt(n)))
  );

  const [maxY, maxX] = findMaxCoords(lines);
  const grid = buildGrid(lines, maxY, maxX);

  return pourSand(grid, maxY);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("14", example, "2022");
  // y, x
  const lines = inp.map(line =>
    line.split(' -> ').map(coord => coord.split(',').reverse().map(n => parseInt(n)))
  );

  const [maxY, maxX] = findMaxCoords(lines);
  const grid = buildGrid(lines, maxY, maxX);

  for (let i = 0; i < grid[0].length; i++) {
    grid[maxY + 2][i] = '#';
  }

  return pourSand(grid, maxY + 2);
}
