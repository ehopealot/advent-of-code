import {loadPuzzleInput} from '../lib/load_file';

const positionKey = (cube: number[]) => cube.join(',');

let score = 0;

const decrementNeighbor = (positions: {[k: string]: boolean}, cube: string, adjacent: string) => {
  if (positions[adjacent]) {
    if (positions[cube]) {
      score -= 1;
    }
    score -= 1 ;
  }
}

const deltas = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];

export function part1(example=false) {
  const inp = loadPuzzleInput("18", example, "2022");

  // [x, y, z]
  const cubes = inp.map(line => line.split(',').map(i => parseInt(i)));

  const positions: {[k: string]: boolean} = {};
  score = 0;
  cubes.forEach(cube => {
    const key = positionKey(cube);
    score += 6
    positions[key] = true;
    deltas.forEach(d => {
      decrementNeighbor(positions, key, positionKey([cube[0] + d[0], cube[1] + d[1], cube[2] + d[2]]));
    });
  });

  return score;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("18", example, "2022");

  score = 0;
  const cubes = inp.map(line => line.split(',').map(i => parseInt(i)));

  const positions: {[k: string]: boolean} = {};

  cubes.forEach(cube => {
    const key = positionKey(cube);
    score += 6;
    positions[key] = true;
    deltas.forEach(d => {
      decrementNeighbor(positions, key, positionKey([cube[0] + d[0], cube[1] + d[1], cube[2] + d[2]]));
    });
  });

  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;

  cubes.forEach(([x, y, z]) => {
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
    if (z > maxZ) {
      maxZ = z;
    }
  });

  const interiorCubes: {[k: string]: boolean} = {};
  const exteriorCubes: {[k: string]: boolean} = {};

  const search = ([x, y, z]: number[], potentialPocket: typeof interiorCubes) => {
    if (x < 1 || x > maxX || y < 1 || y > maxY || z < 1 || z > maxZ) {
      return [potentialPocket, false];
    }

    potentialPocket[positionKey([x, y, z])] = true;

    let inPocket = true;
    for (let d = 0; d < deltas.length; d++) {
      const [dx, dy, dz] = deltas[d];
      const key = positionKey([x + dx, y + dy, z + dz]);
      if (positions[key] == undefined && !potentialPocket[key]) {
        const [_, res] = search([x + dx, y + dy, z + dz], potentialPocket);
        if (!res) {
          inPocket = false;
          break;
        }
      }
    }
    return [potentialPocket, inPocket];
  }


  for (let x = 1; x <= maxX; x++) {
    for (let y = 1; y <= maxY; y++) {
      for (let z = 1; z <= maxZ; z++) {
        const key = positionKey([x, y, z]);
        if (positions[key]) {
          continue;
        } else if (!interiorCubes[key] && !exteriorCubes[key]) {
          const [pocket, isInterior] = search([x, y, z], {});
          if (isInterior) {
            Object.keys(pocket).forEach(key => {
              const coords = key.split(',').map(i => parseInt(i));
              deltas.forEach(([dx, dy, dz]) => {
                const neighborKey = positionKey([coords[0] + dx, coords[1] + dy, coords[2] + dz]);
                decrementNeighbor(positions, key, neighborKey);
              });
              interiorCubes[key] = true;
            });
          } else {
            Object.keys(pocket).forEach(k => {
              exteriorCubes[k] = true;
            });
          }
        }
      }
    }
  }

  return score;
}
