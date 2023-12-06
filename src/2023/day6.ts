import {loadPuzzleInput} from '../lib/load_file';

const parseRaces = (inp: string[]) => {
  const times = inp[0].split(/\s+/).slice(1).map(i => parseInt(i));
  console.log(times);
  const dist = inp[1].split(/\s+/).slice(1).map(i => parseInt(i));
  console.log(dist);
  return {times, dist};
}

const parseRaces2 = (inp: string[]) => {
  const time = parseInt(inp[0].split(/\s+/).slice(1).join(''));
  const dist = parseInt(inp[1].split(/\s+/).slice(1).join(''));
  return {time, dist};
}

const solve = (time: number, dist: number) => {
  let i = 0;
  do {
    i++;
  } while (time*i - i**2 <= dist);
  return (time + 1) - 2*i;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("6", example, "2023");
  const {times, dist} = parseRaces(inp);
  return times.reduce((acc, time, idx) => acc * solve(time, dist[idx]), 1);
}


export function part2(example=false) {
  const inp = loadPuzzleInput("6", example, "2023");
  const {time, dist} = parseRaces2(inp);
  return solve(time, dist);
}
