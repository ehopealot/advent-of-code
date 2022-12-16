import {Heap} from 'typescript-collections';

import {loadPuzzleInput} from '../lib/load_file';

const parseInput = (lines: string[]) => {
  const grid: {[k: string]: {flowRate: number, leadsTo: Array<string>}} = {};
  lines.forEach(line => {
    const match = line.match(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnel[s]? lead[s]? to valve[s]? (.*)$/);
    const valve = match[1];
    const flowRate = parseInt(match[2]);
    const leadsTo = match[3].split(', ');
    grid[valve] = {flowRate, leadsTo};
  });

  return grid;
}

type Path = {
  opened: Set<string>;
  position: string;
  score: number;
  minute: number;
  cost: number;
  elephantPosition: string;
  lastPosition: string;
  lastElephantPosition: string;
}

export function part1(example=false) {
  return 0;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("16", example, "2022");

  const grid = parseInput(inp);

  const valvesWithPressure = Object.keys(grid).filter(k => grid[k].flowRate > 0);
  const maxPossiblePressure = 26 * valvesWithPressure.reduce((acc, v) => {
    return grid[v].flowRate + acc;
  }, 0);

  console.log(maxPossiblePressure);
  const start = {
    opened: new Set<string>(),
    position: 'AA',
    elephantPosition: 'AA',
    lastPosition: '',
    lastElephantPosition: '',
    score: maxPossiblePressure,
    minute: 0,
    cost: valvesWithPressure.reduce((acc, v) => grid[v].flowRate + acc, 0),
  }
  const heap = new Heap<Path>((p1, p2) => {
    return (p2.score - p1.score);
  });

  heap.add(start);
  const bestScoresAtValveByMinute: {[k: string]: {[k: number]: number}} = {};

  let m = 0;

  const addPathIfPromising = (path: Path) => {
    if (path.cost > 0 && path.score <= m) {
      // this can't possibly be a winner so just bail
      return;
    }

    const pathKey = [path.elephantPosition, path.position];
    pathKey.sort();

    const compositePos = `${pathKey[0]},${pathKey[1]}`
    let bestByMinute = bestScoresAtValveByMinute[compositePos];
    if (!bestByMinute) {
      bestByMinute = {};
    }
    let bestAtMinute = bestByMinute[path.minute];
    if (bestAtMinute === undefined) {
      bestAtMinute = 0;
    }

    // 25 is a buffer value thats bigger than the biggest valve...
    // Explanation: dont bother going further if there's already been
    // a path of this length which reached these same valves and
    // released > 25 pressure more than the current path. 25 is a
    // buffer which gives a path which is behind on pressure a chance
    // to catch up, like by opening a big valve in the next minute...
    if ((path.minute < 26) && (bestAtMinute < path.score + 25)) {
      heap.add(path);
      if (bestAtMinute < path.score) {
        bestByMinute[path.minute] = path.score;
        bestScoresAtValveByMinute[compositePos] = bestByMinute;
      }
    } else if (path.minute === 26 && path.score > m) {
      // winner so far!
      m = path.score;
    } else {
      // drop this path
    }
  }

  while (heap.peek()) {
    const current = heap.removeRoot();

    // "cost" is sum of all the unopened valves' pressures. AKA the
    // pressure lost during this minute.
    const cost = valvesWithPressure.reduce((acc, v) => current.opened.has(v) ? acc : acc + grid[v].flowRate, 0);

    for (let neighbor of grid[current.position].leadsTo) {
      for (let elephantNeighbor of grid[current.elephantPosition].leadsTo) {
        // both move. no going back directly to where we just were.
        if (neighbor !== current.lastPosition && elephantNeighbor !== current.lastElephantPosition) {
          const nextPath = {
            opened: new Set(current.opened),
            position: neighbor,
            elephantPosition: elephantNeighbor,
            lastPosition: current.position,
            lastElephantPosition: current.elephantPosition,
            score: current.score - cost,
            minute: current.minute + 1,
            cost,
          }
          addPathIfPromising(nextPath);
        }
      }
    }
    if (!current.opened.has(current.position) && grid[current.position].flowRate > 0) {
      // open mine, elephant moves
      for (let elephantNeighbor of grid[current.elephantPosition].leadsTo) {
        if (elephantNeighbor !== current.lastElephantPosition) {
          const nextPath = {
            opened: new Set(current.opened),
            position: current.position,
            lastPosition: current.position,
            elephantPosition: elephantNeighbor,
            lastElephantPosition: current.elephantPosition,
            score: current.score - cost,
            minute: current.minute + 1,
            cost,
          }
          nextPath.opened.add(current.position);
          addPathIfPromising(nextPath);
        }
      }
    }
    if (!current.opened.has(current.elephantPosition) && grid[current.elephantPosition].flowRate > 0) {
      // open elephant, I move
      for (let neighbor of grid[current.position].leadsTo) {
        if (neighbor !== current.lastPosition) {
          const nextPath = {
            opened: new Set(current.opened),
            position: neighbor,
            elephantPosition: current.elephantPosition,
            score: current.score - cost,
            minute: current.minute + 1,
            lastElephantPosition: current.elephantPosition,
            lastPosition: current.position,
            cost,
          }
          nextPath.opened.add(current.elephantPosition);
          addPathIfPromising(nextPath);
        }
      }
    }
    if (!current.opened.has(current.elephantPosition) && grid[current.elephantPosition].flowRate > 0 && !current.opened.has(current.position) && grid[current.position].flowRate > 0) {
      // open both
      const nextPath = {
        opened: new Set(current.opened),
        position: current.position,
        elephantPosition: current.elephantPosition,
        lastElephantPosition: current.elephantPosition,
        lastPosition: current.position,
        score: current.score - cost,
        minute: current.minute + 1,
        cost,
      }
      nextPath.opened.add(current.position);
      nextPath.opened.add(current.elephantPosition);
      addPathIfPromising(nextPath);
    }
  }

  return m;
}
