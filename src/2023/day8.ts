import {loadPuzzleInput} from '../lib/load_file';

type Node = {
  name: string
  left: string;
  right: string;
}
type Map = {
  instruction: string;
  graph: {[k: string]: Node};
}

const parseMap = (inp: string[]) => {
  const instruction = inp.shift();
  let nodes: {[k: string]: Node} = {};
  inp.forEach(line => {
    const [name, rest] = line.split(' = ');
    const [left, right] = [...rest.matchAll(/\w+/gi)].map(m => m[0]);
    nodes[name] = {name, left, right};
  });
  return {
    instruction,
    graph: nodes,
  }
}

const runMap = (map: Map, start: string = 'AAA', end: string = 'ZZZ') => {
  let cur = map.graph[start];
  let idx = 0;
  while (!cur.name.endsWith(end)) {
    const direction = map.instruction.charAt(idx % map.instruction.length);
    if (direction === 'L') {
      cur = map.graph[cur.left];
    } else {
      cur = map.graph[cur.right];
    }
    idx += 1;
  }
  return idx;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("8", example, "2023");
  return runMap(parseMap(inp));
}

const runMapForGhosts = (map: Map) => {
  const curs = Object.values(map.graph).filter(node => node.name.endsWith('A'));
  const scores = curs.map(cur => runMap(map, cur.name, 'Z'));
  // plug this into wolfram alpha:
  // least common multiple of [scores]
  console.log(scores);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("8", example, "2023");
  return runMapForGhosts(parseMap(inp));
}
