import {loadPuzzleInput} from '../lib/load_file';

const sortRanges = (ranges: number[][]) => (
  ranges.sort((r1, r2) => {
    if (r1[0] - r2[0] !== 0) {
      return r1[0] - r2[0];
    } else {
      return r2[1] - r1[1];
    }
  })
);

export function part1(example=false) {
  const inp = loadPuzzleInput("4", example, "2022");

  return inp.reduce((ans, line) => {
    const ranges = sortRanges(line.split(',').map(range => range.split('-').map(i => parseInt(i))));
    if (ranges[0][0] <= ranges[1][0] && ranges[0][1] >= ranges[1][1]) {
      return ans + 1;
    }
    return ans;
  }, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("4", example, "2022");

  return inp.reduce((ans, line) => {
    const ranges = sortRanges(line.split(',').map(range => range.split('-').map(i => parseInt(i))));
    if (ranges[0][1] >= ranges[1][0]) {
      return ans + 1;
    }
    return ans;
  }, 0);
}
