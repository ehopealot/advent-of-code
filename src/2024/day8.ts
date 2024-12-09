import { inBounds } from '../lib/grid';
import {loadPuzzleInput} from '../lib/load_file';

const getAntennae = (inp: string[][]) => {
  const coordinateMap: {[k: string]: [number, number][]} = {};

  for (let y = 0; y < inp.length; y++) {
    for (let x = 0; x < inp[y].length; x++) {
      const antenna = inp[y][x];
      if (antenna !== '.') {
	if (coordinateMap[antenna]) {
	  coordinateMap[antenna].push([y, x]);
	} else {
	  coordinateMap[antenna] = [[y, x]];
	}
      }
    }
  }
  return coordinateMap;
}

const solve = (inp: string[][], part2: boolean = false) => {
  const antennae = getAntennae(inp);
  const antinodes = new Set<string>();
  let ans = 0;
  const key = (antinode: [number, number]) => (
     `${antinode[0]},${antinode[1]}`
  );
  const isNewAntinode = (antinode: [number, number]) => {
    return !antinodes.has(key(antinode)) &&
      inBounds(inp, antinode[0], antinode[1]);
  }
  const checkAntinode = (antinode: [number, number]) => {
    if (isNewAntinode(antinode)) {
      ans += 1;
      antinodes.add(key(antinode));
    }
  }

  Object.values(antennae).forEach(locations => {
    for (let i = 0; i < locations.length; i++) {
      const l1 = locations[i];
      for (let j = i + 1; j < locations.length; j++) {
	const l2 = locations[j];
	const rise = l2[0] - l1[0];
	const run = l2[1] - l1[1];
	if (part2) {
	  [[l2, 1], [l1, -1]].forEach(([point, m]: [[number, number], number]) => {
	    checkAntinode(point);
	    let nextY = point[0] + rise * m;
	    let nextX = point[1] + run * m;
	    while (inBounds(inp, nextY, nextX)) {
	      checkAntinode([nextY, nextX]);
	      nextY += rise * m;
	      nextX += run * m ;
	    }
	  });
	} else {
	  const antinode1: [number, number] = [l2[0] + rise, l2[1] + run];
	  const antinode2: [number, number] = [l1[0] - rise, l1[1] - run];
	  [antinode1, antinode2].forEach(antinode => checkAntinode(antinode));
	}
      }
    }
  });
  return ans;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("8", example, "2024").map(line => line.split(''));
  return solve(inp);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("8", example, "2024").map(line => line.split(''));
  return solve(inp, true);
}
