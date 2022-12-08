import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  const inp = loadPuzzleInput("8", example, "2022").map(line => line.split('').map(c => parseInt(c)));
  // to avoid double counting trees visible in multiple ways
  const visibleSet = new Set<string>();

  const coordString = (x: number, y: number) => `${x},${y}`;

  for (let y = 1; y < inp.length - 1; y++) {
    let tallestToLeft = inp[y][0];
    for (let x = 1; x < inp[y].length - 1; x++) {
      if (inp[y][x] > tallestToLeft) {
        visibleSet.add(coordString(x, y));
        tallestToLeft = inp[y][x];
      }
    }
    let tallestToRight = inp[y][inp[y].length - 1];
    for (let x = inp[y].length - 2; x >= 1; x--) {
      if (inp[y][x] > tallestToRight) {
        visibleSet.add(coordString(x, y));
        tallestToRight = inp[y][x];
      }
    }
  }

  for (let x = 1; x < inp[0].length - 1; x++) {
    let tallestAbove = inp[0][x];
    for (let y = 1; y < inp.length - 1; y++) {
      if (inp[y][x] > tallestAbove) {
        visibleSet.add(coordString(x, y));
        tallestAbove = inp[y][x];
      }
    }

    let tallestBelow = inp[inp.length - 1][x];
    for (let y = inp.length - 2; y >= 1; y--) {
      if (inp[y][x] > tallestBelow) {
        visibleSet.add(coordString(x, y));
        tallestBelow = inp[y][x];
      }
    }
  }

  return visibleSet.size + (2 * inp[0].length + 2 * inp.length - 4);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("8", example, "2022").map(line => line.split('').map(c => parseInt(c)));

  let maxScore = 0;

  for (let y = 0; y < inp.length; y++) {
    for (let x = 0; x < inp[y].length; x++) {
      // up
      let above = 0;
      for (let y2 = y - 1; y2 >=0; y2--) {
        above += 1;
        if (inp[y2][x] >= inp[y][x]) {
          break;
        }
      }
      // down
      let below = 0;
      for (let y2 = y + 1; y2 < inp.length; y2++) {
        below += 1;
        if (inp[y2][x] >= inp[y][x]) {
          break;
        }
      }
      // left
      let toLeft = 0;
      for (let x2 = x - 1; x2 >= 0; x2--) {
        toLeft += 1;
        if (inp[y][x2] >= inp[y][x]) {
          break;
        }
      }
      // right
      let toRight = 0;
      for (let x2 = x + 1; x2 < inp[y].length; x2++) {
        toRight += 1;
        if (inp[y][x2] >= inp[y][x]) {
          break;
        }
      }

      maxScore = Math.max(maxScore, above * below * toLeft * toRight);
    }
  }
  return maxScore;
}
