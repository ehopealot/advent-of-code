import {loadPuzzleInput} from '../lib/load_file';

/*
  A: rock
  B: paper
  C: scissors

  X: rock
  Y: paper
  Z: scissors
*/

const ties = {
  'A': 'X',
  'B': 'Y',
  'C': 'Z',
}

const wins = {
  'A': 'Z',
  'B': 'X',
  'C': 'Y',
}

const loses = {
  'A': 'Y',
  'B': 'Z',
  'C': 'X',
}

const scores = {
  'X': 1,
  'Y': 2,
  'Z': 3,
}

function checkVictory(hand1: string, hand2: string) {
  if (ties[hand1] == hand2) {
    return 0;
  } else if (wins[hand1] == hand2) {
    return -1;
  } else {
    return 1;
  }
}

export function part1(example=false) {
  const inp = loadPuzzleInput("2", example, "2022");

  let total = 0;
  inp.forEach(line => {
    const moves = line.split(' ');
    const result = checkVictory(moves[0], moves[1]);
    if (result == 1) {
      total += scores[moves[1]] + 6;
    } else if (result == 0) {
      total += scores[moves[1]] + 3;
    } else {
      total += scores[moves[1]];
    }
  });

  return total;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("2", example, "2022");

  let total = 0;

  inp.forEach(line => {
    const moves = line.split(' ');

    let move = "";
    if (moves[1] === 'X') {
      // lose
      move = wins[moves[0]];
    } else if (moves[1] === 'Y') {
      // draw
      move = ties[moves[0]];
      total += 3;
    } else {
      // win
      move = loses[moves[0]];
      total += 6;
    }
    total += scores[move];
  });

  return total;
}
