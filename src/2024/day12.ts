import { cardinalVisit, inBounds } from '../lib/grid';
import {loadPuzzleInput} from '../lib/load_file';

const key = (y: number, x: number) => `${y},${x}`;
const unpack = (k: string) => k.split(",").map(i => parseInt(i));

const exploreRegion = (grid: string[][], y: number, x: number) => {
  const target = grid[y][x];
  const mapped = new Set<string>();
  mapped.add(key(y, x));
  const stack: [number, number][] = [[y, x]];
  while (stack.length) {
    const [y, x] = stack.pop();
    cardinalVisit(grid, y, x, (newY, newX) => {
      const k = key(newY, newX);
      if (grid[newY][newX] === target && !mapped.has(k)) {
	mapped.add(k);
	stack.push([newY, newX]);
      }
    });
  }
  return mapped;
}

type EdgeMap = {
  RIGHT: {[k: number]: number[]},
  LEFT: {[k: number]: number[]},
  UP: {[k: number]: number[]},
  DOWN: {[k: number]: number[]},
}


const solve = (grid: string[][]) => {
  const mapped = new Set<string>();
  const regions: Set<string>[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!mapped.has(key(y, x))) {
	const region = exploreRegion(grid, y, x);
	region.forEach(k => mapped.add(k));
	regions.push(region);
      }
    }
  }
  let ansP1 = 0;
  let ansP2 = 0;
  regions.forEach(region => {
    const area = region.size;
    let perim = 0;

    const allEdges: EdgeMap = {
      RIGHT: {}, LEFT: {}, UP: {}, DOWN: {},
    }

    region.forEach(k => {
      const [y, x] = unpack(k);
      const target = grid[y][x];
      let numEdges = 4;
      [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dy, dx]) => {
	const newY = y + dy;
	const newX = x + dx;
	if (inBounds(grid, newY, newX) && grid[newY][newX] === target) {
	  numEdges -= 1;
	} else {
	  const getKeys = () => {
	    if (dx === 1) {
	      return ['RIGHT', newX, y];
	    } else if (dx === -1) {
	      return ['LEFT', x, y];
	    } else if (dy === 1) {
	      return ['DOWN', newY, x];
	    } else {
	      return ['UP', y, x];
	    }
	  }
	  const [direction, edge, coord] = getKeys();
	  const edges = allEdges[direction];
	  const edgeCoords = edges[edge] || [];
	  edgeCoords.push(coord);
	  edges[edge] = edgeCoords;
	}
      });
      
      perim += numEdges;
    });
    ansP1 += area * perim;

    const numEdges = (coords: number[]) => (
      coords.sort((a, b) => a - b).reduce((a, coord, idx) => (idx > 0 && coord - coords[idx-1] !== 1) ? a + 1 : a, 1)
    );
    const edgesOnSide = (side: {[k: number]: number[]}) => (
      Object.values(side).reduce((a, c) => a + numEdges(c), 0)
    );
    const totalEdges = ['RIGHT', 'LEFT', 'UP', 'DOWN'].reduce((a, dir) => a + edgesOnSide(allEdges[dir]), 0);
    ansP2 += area * totalEdges;
  });
  return {ansP1, ansP2};
}

export function part1(example=false) {
  const inp = loadPuzzleInput("12", example, "2024").map(line => line.split(''));
  return solve(inp).ansP1;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("12", example, "2024").map(line => line.split(''));
  return solve(inp).ansP2;
}
