import {loadPuzzleInput} from '../lib/load_file'

export function part1(example=false) {
  const inp = loadPuzzleInput("13", example, "2020");

  const start = parseInt(inp[0]);
  const buses = inp[1].split(',').filter((x) => x !== 'x').map(x => parseInt(x));

  let minBus = Number.MAX_SAFE_INTEGER;
  let minDist = Number.MAX_SAFE_INTEGER;
  buses.forEach(bus => {
    const mod = start % bus;
    const dist = bus - mod;
    if (dist < minDist) {
      minBus = bus;
      minDist = dist;
    }
  });

  return minBus * minDist;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("13", example, "2020");

  const incr = 73184371; // 601 * 29 * 13 * 17 * 19
  let t = incr;

  let found = false;
  while (!found) {
    if (t % 601 == 0 &&
      (t - 10) % 41 == 0 &&
      (t - 29) % 29 == 0 &&
      (t + 8) % 23 == 0 &&
      (t + 13) % 13 == 0 &&
      (t + 17) % 17 == 0 &&
      (t + 19) % 19 == 0 &&
      (t + 31) % 463 == 0 &&
      (t + 68) % 37 == 0) {
      found = true;
    } else {
      t += incr;
    }
  }

  return t - 29;
}
