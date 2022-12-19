import {loadPuzzleInput} from '../lib/load_file';

interface Rock {
  coords: number[];
  leftHits: number[][];
  rightHits: number[][];
  downHits: number[][];
  fillCoords: number[][];

  bottomOffset: number;
}

const moveRock = (r: Rock, dx: number) => {

}

class Rock1 implements Rock {

  coords: number[];
  bottomOffset = 1;

  leftHits = [
    [0, -1],
  ];
  rightHits = [
    [0, 4],
  ];
  downHits = [
    [-1, 0],
    [-1, 1],
    [-1, 2],
    [-1, 3],
  ];

  fillCoords = [[0, 0], [0, 1], [0, 2], [0, 3]];
}

class Rock2 implements Rock {
  coords: number[];

  bottomOffset = 3;

  leftHits = [
    [0, 0],
    [-1, -1],
    [-2, 0],
  ];
  rightHits = [
    [0, 2],
    [-1, 3],
    [-2, 2],
  ];
  downHits = [
    [-2, 0],
    [-3, 1],
    [-2, 2],
  ];

  fillCoords = [[0, 1], [-1, 0], [-1, 1], [-1, 2], [-2, 1]];
}

class Rock3 implements Rock {
  coords: number[];

  bottomOffset = 3;

  leftHits = [
    [0, 1],
    [-1, 1],
    [-2, -1],
  ];
  rightHits = [
    [0, 3],
    [-1, 3],
    [-2, 3],
  ];
  downHits = [
    [-3, 0],
    [-3, 1],
    [-3, 2],
  ];


  fillCoords = [[0, 2], [-1, 2], [-2, 0], [-2, 1], [-2, 2]];
}


class Rock4 implements Rock {

  coords: number[];

  bottomOffset = 4;

  leftHits = [
    [0, -1],
    [-1, -1],
    [-2, -1],
    [-3, -1],
  ];
  rightHits = [
    [0, 1],
    [-1, 1],
    [-2, 1],
    [-3, 1],
  ];
  downHits = [
    [-4, 0],
  ];

  fillCoords = [[0, 0], [-1, 0], [-2, 0], [-3, 0]];
}

class Rock5 implements Rock {
  coords: number[];

  bottomOffset = 2;

  leftHits = [
    [0, -1],
    [-1, -1],
  ];
  rightHits = [
    [0, 2],
    [-1, 2],
  ];
  downHits = [
    [-2, 0],
    [-2, 1],
  ];

  fillCoords = [[0, 0], [0, 1], [-1, 0], [-1, 1]];
}

const Rocks = [Rock1, Rock2, Rock3, Rock4, Rock5];

const rockFactory = (n: number, y: number, x: number) => {
  const rock = new Rocks[n % 5]();
  rock.coords = [y + rock.bottomOffset, x];
  return rock;
}

const squareFree = (grid: {[k: number]: {[k: number]: boolean}}, y: number, x: number) => {
  if (x < 0) {
    return false;
  }
  if (x >= 7) {
    return false;
  }

  if (y === 0) {
    return false;
  }

  if (!grid[y]) {
    return true;
  }
  if (!grid[y][x]) {
    return true;
  }
  return false;
}

const fillGrid = (grid: {[k :number]: {[k: number]: boolean}}, rock: Rock) => {
  rock.fillCoords.forEach(([dy, dx]) => {
    const y = rock.coords[0] + dy;
    const x = rock.coords[1] + dx;
    if (!grid[y]) {
      grid[y] = {};
    }
    grid[y][x] = true;
  });
}

const drawGrid = (grid: {[k: number]: {[k: number]: boolean}}) => {
  const gridStrings: string[] = [];
  for (let i = 0; i < 25; i++) {
    const row = grid[i];
    if (!row) {
      gridStrings.unshift('.......');
    } else {
      const chars: string[] = [];
      for (let x = 0; x < 7; x++) {
        chars.push(row[x] ? '#' : '.');
      }
      gridStrings.unshift(chars.join(''));
    }
  }
  console.log(gridStrings.join('\n'));
}

export function part1(example=false) {
  const inp = loadPuzzleInput("17", example, "2022");
  const jets = inp[0].split('');
  const startX = 2;
  const startY = 3;

  const grid: {[k: number]: {[k: number]: boolean}} = {};
  let highestPoint = 0;
  let jetCounter = 0;
  const foundHighestPoints = [];
  const deltas = [];
  for (let i = 0; i < 2022; i++) {
    const rock = rockFactory(i, startY + highestPoint, startX);
    let fell = true;
    let counter = 0;
    while (fell) {
      if (counter % 2 === 0) {
        if (jets[jetCounter % jets.length] === '>') {
          // go right
          const canMove = rock.rightHits.every(([dy, dx]) => {
            return squareFree(grid, rock.coords[0] + dy, rock.coords[1] + dx);
          });
          if (canMove) {
            rock.coords[1] += 1;
          }
        } else {
          // go left
          const canMove = rock.leftHits.every(([dy, dx]) => {
            return squareFree(grid, rock.coords[0] + dy, rock.coords[1] + dx);
          });
          if (canMove) {
            rock.coords[1] -= 1;
          }
        }
        jetCounter += 1;
      } else {
        const canMove = rock.downHits.every(([dy, dx]) => {
          return squareFree(grid, rock.coords[0] + dy, rock.coords[1] + dx);
        });
        if (canMove) {
          rock.coords[0] -= 1;
        } else {
          fell = false;
          fillGrid(grid, rock);
          const newHighestPoint = Math.max(highestPoint, rock.coords[0]);
          // stuff i added to figure out part 2
          // if (i % 4 === 0) {
          //   if (deltas.length === 0) {
          //     deltas.push([0, 0]);
          //   } else {
          //     deltas.push([i+1, newHighestPoint - foundHighestPoints[foundHighestPoints.length - 1]]);

          // why 12? its a rare delta i noticed in the output so i just did
          // this to figure out how far it is between 12s
          //     if (newHighestPoint - foundHighestPoints[foundHighestPoints.length - 1] === 12) {
          //       console.log(`${i + 1}: ${newHighestPoint}`);
          //     }
          //   }
          //   foundHighestPoints.push(newHighestPoint);
          // }
          highestPoint = newHighestPoint;
        }
      }
      counter += 1;
    }
  }
  return highestPoint;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("17", example, "2022");
  // for my part 2 input, based on just looking at the deltas of the height
  // at every 5th rock (when one cycle of rocks is done...):

  // Cycle starts at 1305, is 6820 long, adds 10328 height
  // (figure out from inspection... value at 1305 is 1985, at 8125 its 12313,
  // at 14945 its 22641... (22641 - 12313) = 10328. 14945 - 8125 = 6820. So...

  // (10^12 - 1305) % 6820 === 5395
  // Height at 1305 + 5395 is 10164. (just ran the simulation to find this)
  // Meaning the answer is:
  // Height up to 1305 (1985) + Math.floor((10^12 - 1305) / 6820) * 10328 +
  // (10164 - 1305) [dont double count the initial 1305]. AKA:
  // Math.floor(((1000000000000 - 1305) / 6820)) * 10328 + 10164
  return Math.floor(((1000000000000 - 1305) / 6820)) * 10328 + 10164;
}
