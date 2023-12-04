import {loadPuzzleInput} from '../lib/load_file';

const scoreGame = (game: string) => {
  const parts = game.split(':')[1].split('|');
  const winners = new Set([...parts[0].matchAll(/\d+/gi)].map(m => m[0]));
  const cards = [...parts[1].matchAll(/\d+/gi)].map(m => m[0]);

  const intersec = cards.filter(card => winners.has(card));

  const score = intersec.length == 0 ? 0 : 2 ** (intersec.length - 1);
  return score;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("4", example, "2023");
  return inp.reduce((score, game) => score + scoreGame(game), 0);
}

const scoreGame2 = (game: string) => {
  const parts = game.split(':')[1].split('|');
  const winners = new Set([...parts[0].matchAll(/\d+/gi)].map(m => m[0]));
  const cards = [...parts[1].matchAll(/\d+/gi)].map(m => m[0]);

  return cards.filter(card => winners.has(card)).length;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("4", example, "2023");
  const totals: {[k: number]: number} = {};
  for (let i = 0; i < inp.length; i++) {
    totals[i] = 1;
  }
  for (let i = 0; i < inp.length; i++) {
    const score = scoreGame2(inp[i]);
    for (let j = i+1; j < Math.min(i+1+score, inp.length); j++) {
      totals[j] += totals[i];
    }
  }

  return Object.values(totals).reduce((acc, n) => acc + n, 0);
}
