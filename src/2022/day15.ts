import {loadPuzzleInput} from '../lib/load_file';

type SensorAndBeacon = {
  sensor: number[];
  beacon: number[];
}

const parseInput = (lines: string[]) => {
  return lines.map(line => {
    const match = [...line.matchAll(/x=(-?\d+), y=(-?\d+)/g)];
    const sensor = [match[0][1], match[0][2]].map(i => parseInt(i)).reverse();
    const beacon = [match[1][1], match[1][2]].map(i => parseInt(i)).reverse();
    return {sensor, beacon};
  });
}

const coveredCount = (sensorAndBeacons: ReturnType<typeof parseInput>, row: number, minSize = Number.MIN_SAFE_INTEGER, maxSize = Number.MAX_SAFE_INTEGER, subtractSensorsAndBeacons = true) => {
  const ranges: number[][] = [];
  const takenIdxes = new Set<number>();
  sensorAndBeacons.forEach(({sensor, beacon}) => {
    const dy = Math.abs(beacon[0] - sensor[0]);
    const dx = Math.abs(beacon[1] - sensor[1]);
    const dist = dx + dy;

    const verticalDist = Math.abs(row - sensor[0]);
    if (verticalDist <= dist) {
      // its within range vertically
      const range = [sensor[1] - (dist - verticalDist), sensor[1] + Math.abs(dist - verticalDist)];

      if (range[1] < minSize || range[0] > maxSize) {
        // for part 2
        return;
      }
      range[0] = Math.max(minSize, range[0]);
      range[1] = Math.min(maxSize, range[1]);
      ranges.push(range);
    }

    if (sensor[0] === row) {
      takenIdxes.add(sensor[1]);
    }
    if (beacon[0] === row) {
      takenIdxes.add(beacon[1]);
    }
  });

  ranges.sort((c1, c2) => {
    if (c1[0] < c2[0]) {
      return -1;
    } else if (c1[0] > c2[0]) {
      return 1;
    } else {
      return (c1[1] - c2[1]);
    }
  });

  const mergedRow: number[][] = [];

  let cur = ranges[0];
  for (let i = 1; i < ranges.length; i++) {
    if (cur[1] >= ranges[i][0] - 1) {
      cur[1] = Math.max(cur[1], ranges[i][1]);
    } else {
      mergedRow.push(cur);
      cur = ranges[i];
    }
  }

  mergedRow.push(cur);

  return [mergedRow.reduce((acc, range) => {
    return acc + (range[1] - range[0]) + 1;
  }, 0) - (subtractSensorsAndBeacons ? takenIdxes.size : 0), mergedRow];
}


export function part1(example=false) {
  const inp = loadPuzzleInput("15", example, "2022");

  const sensorAndBeacons = parseInput(inp);

  return coveredCount(sensorAndBeacons, 2000000)[0];
}

export function part2(example=false) {
  const inp = loadPuzzleInput("15", example, "2022");

  const sensorAndBeacons = parseInput(inp);

  let maxSize = 4000000;
  for (let i = 0; i <= maxSize; i++) {
    const [res, row] = coveredCount(sensorAndBeacons, i, 0, maxSize, false);
    if (res != maxSize + 1) {
      console.log(i);
      console.log(row);
      return (row[0][1] + 1) * 4000000 + i;
    }
  }
}
