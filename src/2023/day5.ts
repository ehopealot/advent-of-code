import {loadPuzzleInput} from '../lib/load_file';

const parseMaps = (input: string[]) => {
  const seeds = [...input.shift().matchAll(/\d+/gi)].map(m => parseInt(m[0]));
  input.shift();

  const maps: Array<Array<(num: number) => number>> = [];
  let curMap: Array<(num: number) => number> = [];
  input.forEach(line => {
    if (line.match(/\w+-\w+-\w+/)) {
      if (curMap.length) {
        maps.push(curMap);
      }
      curMap = [];
    } else {
      const [dest, source, length] = line.split(' ').map(i => parseInt(i));
      curMap.push((num: number) =>
        num >= source && num < (source + length) ? dest + (num - source) : num);
    }
  });
  maps.push(curMap);

  return {seeds, maps};
}

export function part1(example=false) {
  const inp = loadPuzzleInput("5", example, "2023");

  const {seeds, maps} = parseMaps(inp);

  return seeds.reduce((lowestLocation, seed) => {
    const location = maps.reduce((val, map) => {
      for (let i = 0; i < map.length; i++) {
        if (map[i](val) !== val) {
          return map[i](val);
        }
      }
      return val;
    }, seed);
    return Math.min(location, lowestLocation);
  }, Number.MAX_SAFE_INTEGER);
}

const parseMaps2 = (input: string[]) => {
  const seeds = [...input.shift().matchAll(/\d+/gi)].map(m => parseInt(m[0]));
  input.shift();

  const maps: Array<Array<Array<number>>> = [];
  let curMap: Array<Array<number>> = [];
  input.forEach(line => {
    if (line.match(/\w+-\w+-\w+/)) {
      if (curMap.length) {
        maps.push(curMap);
      }
      curMap = [];
    } else {
      const [dest, source, length] = line.split(' ').map(i => parseInt(i));
      curMap.push([source, source+length, dest]);
    }
  });
  maps.push(curMap);

  return {seeds, maps};
}


export function part2(example=false) {
  const inp = loadPuzzleInput("5", example, "2023");

  const {seeds, maps} = parseMaps2(inp);

  const seedRanges = [];
  for (let i = 0; i < seeds.length; i+= 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i+1]]);
  }

  let inputRanges = seedRanges;
  for (let m = 0; m < maps.length; m++) {
    const ranges = maps[m];
    const newRanges = [];
    inputRanges.forEach(input => {
      const [inpStart, inpEnd] = input;
      let overlap = false;
      ranges.forEach(range => {
        const [sourceStart, sourceEnd, dest] = range;
        if (inpStart <= sourceEnd) {
          if (inpEnd > sourceStart) {
            overlap = true;
            const transformStartRange = Math.max(inpStart, sourceStart);
            const transformEndRange = Math.min(inpEnd, sourceEnd);
            newRanges.push([
              dest + (transformStartRange - sourceStart),
              dest + (transformEndRange - sourceStart),
            ]);
            if (inpStart < sourceStart) {
              newRanges.push([inpStart, sourceStart]);
            }
            if (inpEnd > sourceEnd) {
              newRanges.push([sourceEnd, inpEnd]);
            }
          }
        }
      });
      if (!overlap) {
        newRanges.push(input);
      }
    });

    newRanges.sort((r1, r2) => {
      if (r1[0] < r2[0]) {
        return -1;
      } else if (r1[0] > r2[0]) {
        return 1;
      }
      return 0;
    });
    const compacted = [];
    let cur = newRanges[0];
    for (let i = 1; i < newRanges.length; i++) {
      if (cur[1] >= newRanges[i][0]) {
        cur = [cur[0], Math.max(newRanges[i][1], cur[1])];
      } else {
        compacted.push(cur);
        cur = newRanges[i];
      }
    }
    compacted.push(cur);

    console.log(compacted);
    inputRanges = compacted;
  };
  console.log(inputRanges);
  return inputRanges.reduce((min, range) => Math.min(range[0], min), Number.MAX_SAFE_INTEGER);
}
