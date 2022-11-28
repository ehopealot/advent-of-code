import {loadPuzzleInput} from '../lib/load_file'



function doMoves(moves: Array<string>) {
  const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let vector = 0; // y = 0, x = 1;
  let pos = [0, 0];

  moves.forEach((move: string) => {
    const cmd = move.slice(0, 1);
    const magnitude = parseInt(move.slice(1));
    switch(cmd) {
      case 'N':
        pos[0] += magnitude;
        break;
      case 'S':
        pos[0] -= magnitude;
        break;
      case 'E':
        pos[1] += magnitude;
        break;
      case 'W':
        pos[1] -= magnitude;
        break;
      case 'L': {
        const turns = magnitude / 90;
        vector += turns;
        vector %= 4;
        break;
      }
      case 'R': {
        const turns = magnitude / 90;
        vector -= turns;
        if (vector < 0) {
          vector = 4 + vector;
        }
        break;
      }
      case 'F':
        pos[0] += vectors[vector][0] * magnitude;
        pos[1] += vectors[vector][1] * magnitude;
        break;
    }
  });

  return Math.abs(pos[0]) + Math.abs(pos[1]);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("12", example, "2020");
  return doMoves(inp);
}


function doMoves2(moves: Array<string>) {
  const rotations = [[[0, -1], [1, 0]], [[-1, 0], [0, -1]], [[0, 1], [-1, 0]]];
  let waypointPos = [10, 1];
  let pos = [0, 0];

  moves.forEach((move: string) => {
    const cmd = move.slice(0, 1);
    const magnitude = parseInt(move.slice(1));
    switch(cmd) {
      case 'N':
        waypointPos[1] += magnitude;
        break;
      case 'S':
        waypointPos[1] -= magnitude;
        break;
      case 'E':
        waypointPos[0] += magnitude;
        break;
      case 'W':
        waypointPos[0] -= magnitude;
        break;
      case 'L': {
        const turns = magnitude / 90;
        const rotationMatrix = rotations[turns - 1];
        waypointPos = [
          rotationMatrix[0][0] * waypointPos[0] + rotationMatrix[0][1] * waypointPos[1],
          rotationMatrix[1][0] * waypointPos[0] + rotationMatrix[1][1] * waypointPos[1]
          ]
        break;
      }
      case 'R': {
        const turns = 4 - magnitude / 90;
        const rotationMatrix = rotations[turns - 1];
        waypointPos = [
          rotationMatrix[0][0] * waypointPos[0] + rotationMatrix[0][1] * waypointPos[1],
          rotationMatrix[1][0] * waypointPos[0] + rotationMatrix[1][1] * waypointPos[1]
          ]
        break;
      }
      case 'F':
        pos[0] += waypointPos[0] * magnitude;
        pos[1] += waypointPos[1] * magnitude;
        break;
    }
  });

  return Math.abs(pos[0]) + Math.abs(pos[1]);
}



export function part2(example=false) {
  const inp = loadPuzzleInput("12", example, "2020");

  return doMoves2(inp);
}
