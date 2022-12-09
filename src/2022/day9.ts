import {loadPuzzleInput} from '../lib/load_file';

const VECTORS = {
  'R': [1, 0], // x, y
  'L': [-1, 0],
  'U': [0, 1],
  'D': [0, -1]
}

const moveToAdjacent = (head: number[], tail: number[]) => {
  const dist = [head[0] - tail[0], head[1] - tail[1]];
  const move = [0, 0];
  if (Math.abs(dist[0]) > 1 || Math.abs(dist[1]) > 1) {
    move[0] = Math.max(-1, Math.min(1, dist[0]));
    move[1] = Math.max(-1, Math.min(1, dist[1]));
  }
  return move;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("9", example, "2022");

  const head = [0, 0];
  const tail = [0, 0];

  return inp.reduce((visited, instruction) => {
    const [direction, magnitude] = instruction.split(' ');
    const [vecx, vecy] = VECTORS[direction];

    for (let i = 0; i < parseInt(magnitude); i++) {
      head[0] += vecx;
      head[1] += vecy;
      const [dx, dy] = moveToAdjacent(head, tail);
      tail[0] += dx;
      tail[1] += dy;
      visited.add(`${tail[0]},${tail[1]}`);
    }

    return visited;
  }, new Set<string>()).size;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("9", example, "2022");
  const head = [0, 0];
  const tails: number[][] = [];
  for (let t = 0; t < 9; t++) {
    tails.push([0, 0]);
  }

  return inp.reduce((visited, instruction) => {
    const [direction, magnitude] = instruction.split(' ');
    const [vecx, vecy] = VECTORS[direction];

    for (let i = 0; i < parseInt(magnitude); i++) {
      head[0] += vecx;
      head[1] += vecy;
      let curHead = head;
      for (let t = 0; t < 9; t++) {
        const tail = tails[t];
        const [dx, dy] = moveToAdjacent(curHead, tail);
        tail[0] += dx;
        tail[1] += dy;
        curHead = tail;
      }

      visited.add(`${curHead[0]},${curHead[1]}`);
    }
    return visited;
  }, new Set<string>()).size;
}
