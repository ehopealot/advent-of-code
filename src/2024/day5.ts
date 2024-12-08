import {loadPuzzleInput} from '../lib/load_file';

const evaluateOrders = (inp: string[], fn: (pages: string[], ordered: boolean, order: {[k: string]: Set<string>}) => void) => {
  const order: {[k: string]: Set<string>} = {};
  let ans = 0;
  let i = 0;
  for (; i < inp.length; i++) {
    if (inp[i].includes(',')) {
      break;
    }
    const [before, after] = inp[i].split('|');
    if (order[before]) {
      order[before].add(after);
    } else {
      order[before] = new Set([after]);
    }
  }
  for (; i < inp.length; i++) {
    const pages = inp[i].split(',');
    const sets: Set<string>[] = [];
    const ordered = pages.every(page => {
      if (!sets.every(s => s.has(page))) {
	return false;
      } else {
	sets.push(order[page] || new Set());
	return true;
      }
    });
    fn(pages, ordered, order);
  }
  return ans;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("5", example, "2024");
  let ans = 0;
  evaluateOrders(inp, (pages, ordered) => {
    if (ordered) {
      ans += parseInt(pages[Math.floor(pages.length / 2)]);
    }
  });
  return ans;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("5", example, "2024");
  let ans = 0;
  evaluateOrders(inp, (pages, ordered, order) => {
    if (ordered) {
      return;
    }
    pages.sort((p1, p2) => {
      if (!order[p1]) {
	return 1;
      } else if (!order[p2]) {
	return -1;
      } else if (order[p1].has(p2)) {
	return -1;
      } else {
	return 1;
      }
    });
    ans += parseInt(pages[Math.floor(pages.length / 2)]);
  });
  return ans;
}
