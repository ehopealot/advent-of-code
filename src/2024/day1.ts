import {loadPuzzleInput} from '../lib/load_file';

const getLists = (inp: string[]) => {
  const list1: number[] = [];
  const list2: number[] = [];
  inp.forEach(line => {
    const [first, second] = line.split(/\s+/).map(i => parseInt(i));
    list1.push(first);
    list2.push(second);
  });
  return [list1, list2];
}

export function part1(example=false) {
  const inp = loadPuzzleInput("1", example, "2024");
  const [list1, list2] = getLists(inp);
  list1.sort((a, b) => a-b);
  list2.sort((a, b) => a-b);
  return list1.reduce((acc, val, idx) => acc + Math.abs(val - list2[idx]), 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("1", example, "2024");
  const [list1, list2] = getLists(inp);

  const counts = list2.reduce((counts, val) => {
    if (!counts[val]) {
      counts[val] = 1;
    } else {
      counts[val] += 1;
    }
    return counts;
  }, {});
  
  return list1.reduce((acc, val) => acc + val * (counts[val] || 0), 0);
}
