import {loadPuzzleInput} from '../lib/load_file';
const PQ = require('fastpriorityqueue');

const MOVES = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};


const minimizeLoss = (grid: number[][]) => {
  const inbounds = (y: number, x: number) => (
    y < grid.length && y >= 0 && x < grid[0].length && x >= 0
  );
  const key = (y: number, x: number) => `${y},${x}`;

  const firstPath = [0, 0, 0, -1, 0]; // y, x, cost, direction, steps
  const paths = new PQ((p1, p2) => p1[2] < p2[2]);
  paths.add(firstPath);
  const timesToPoint: {[k: string]: number} = {[key(0, 0)]: 1};
  while(!paths.isEmpty()) {
    const [y, x, cost, dir, steps] = paths.poll();
    if (y === grid.length - 1 && x === grid[0].length - 1) {
      // found it
      return cost;
    }
    Object.entries(MOVES).forEach(([moveDir, [dy, dx]]) => {
      const [newY, newX] = [y + dy, x + dx];
      const k = key(newY, newX);
      // no going backwards
      if (dir !== -1 && parseInt(moveDir) === (parseInt(dir) + 2) % 4) {
        return;
      }
      if (inbounds(newY, newX)) {
        if ((moveDir === dir && steps < 10) || dir === - 1 || (moveDir !== dir && steps >= 4)) {
          const newCost = cost + grid[newY][newX];
          const newSteps = dir === moveDir ? steps + 1 : 1;
          const ttp = (timesToPoint[k] || 0);
          // arrived at 200 as a reasonable amount of times to revisit a square by
          // progressively increasing until the answer seemed to converge
          if (ttp < 200) {
            timesToPoint[k] = ttp + 1;
            paths.add([newY, newX, newCost, moveDir, newSteps]);
          }
        }
      }
    });
  }
  return 0;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("17", example, "2023").map(line => line.split('').map(i => parseInt(i)));

  return minimizeLoss(inp);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("17", example, "2023").map(line => line.split('').map(i => parseInt(i)));
  return minimizeLoss(inp);
}
