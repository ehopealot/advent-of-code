import {loadPuzzleInput} from '../lib/load_file';

const isSafe = (level: number[]) => {
  const diff = level[0] - level[1];
  if (diff === 0) {
    return false;
  }
  const cmpfn = diff < 0 ? (a, b) => a > b : (a, b) => a < b;
  const safetyFn = (a, b) => cmpfn(a, b) && Math.abs(a - b) <= 3;
  return level.every((val, idx) => idx === 0 || safetyFn(val, level[idx - 1]));
}

const isSafe2 = (level: number[], canRecur: boolean) => {
  const diff = level[0] - level[1];
  const cmpfn = diff < 0 ? (a, b) => a > b : (a, b) => a < b;
  const safetyFn = (a, b) => cmpfn(a, b) && Math.abs(a - b) <= 3;
  for (let i = 1; i < level.length; i++) {
    if (!safetyFn(level[i], level[i-1])) {
      if (!canRecur) {
	return false;
      } else {
	return (i === 2 ? [0, i-1, i] : [i-1, i]).some(idx => {
	  const copy = [...level];
	  copy.splice(idx, 1);
	  return isSafe2(copy, false);
	});
      }
    }
  }
  return true;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("2", example, "2024");
  const levels = inp.map(row => row.split(' ').map(i => parseInt(i)));

  return levels.filter(level => isSafe(level)).length;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("2", example, "2024");
  const levels = inp.map(row => row.split(' ').map(i => parseInt(i)));

  return levels.filter(level => isSafe2(level, true)).length;
}
