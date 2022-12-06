import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  return loadPuzzleInput("6", example, "2022")[0].split('').findIndex((_, idx, stream) => (new Set(stream.slice(idx, idx + 4))).size == 4) + 4;
}

export function part2(example=false) {
  return loadPuzzleInput("6", example, "2022")[0].split('').findIndex((_, idx, stream) => (new Set(stream.slice(idx, idx + 14))).size == 14) + 14;
}
