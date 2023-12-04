import {loadPuzzleInput} from '../lib/load_file';

const getScore = (game: string, red: number, green: number, blue: number) => {
  const id = parseInt(game.match(/\d+/)[0]);
  const limits = {red, green, blue};
  const parts = game.split(";");
  return parts.every(part => {
    const cubeCounts = [...part.matchAll(/\d+ (red|green|blue)/gi)];
    return cubeCounts.every(cc => {
      const [count, color] = cc[0].split(" ");
      return parseInt(count) <= limits[color];
    });
  }) ? id : 0;
}

const getScore2 = (game: string) => {
  const id = parseInt(game.match(/\d+/)[0]);
  const limits = {red: 0, green: 0, blue: 0};
  const parts = game.split(";");
  parts.forEach(part => {
    const cubeCounts = [...part.matchAll(/\d+ (red|green|blue)/gi)];
    cubeCounts.forEach(cc => {
      const [count, color] = cc[0].split(" ");
      limits[color] = Math.max(parseInt(count), limits[color]);
    });
  });
  return limits['red'] * limits['green'] * limits['blue'];
}

export function part1(example=false) {
  const inp = loadPuzzleInput("2", example, "2023");

  return inp.reduce((acc, game) => acc + getScore(game, 12, 13, 14), 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("2", example, "2023");
  return inp.reduce((acc, game) => acc + getScore2(game), 0);
}
