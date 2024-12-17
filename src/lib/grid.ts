

const moves = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
]

export function inBounds(grid: Array<Array<unknown>>, y: number, x: number) {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
}

export function neighborVisit(grid: Array<Array<unknown>>, y: number, x: number, visit: (y: number, x: number, dy: number, dx: number) => boolean | void) {
  for (let i = 0; i < moves.length; i++) {
    const [dy, dx] = moves[i];
    if (inBounds(grid, y + dy, x + dx)) {
      if (visit(y + dy, x + dx, dy, dx)) {
	break;
      }
    }
  };
}

const cardinalMoves = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
export function cardinalVisit(grid: Array<Array<unknown>>, y: number, x: number, visit: (y: number, x: number, dy: number, dx: number) => boolean | void) {
  for (let i = 0; i < cardinalMoves.length; i++) {
    const [dy, dx] = cardinalMoves[i];
    if (inBounds(grid, y + dy, x + dx)) {
      if (visit(y + dy, x + dx, dy, dx)) {
	break;
      }
    }
  };
}
