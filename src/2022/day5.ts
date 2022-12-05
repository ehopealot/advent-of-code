import {loadPuzzleInput} from '../lib/load_file';

const parseCrates = (inp: string[]) => {
  const crates: string[][] = []

  const numRegex = /^\s(\d+\s*)+$/;
  const crateLine = inp.findIndex(line => {
    return !!line.match(numRegex);
  });

  const numCrates = inp[crateLine].match(/(\d+)/g).length

  for (let c = 0; c < numCrates; c++) {
    crates.push([]);
  }

  for (let i = 0; i < crateLine; i++) {
    const line = inp[i];
    for (let j = 0; j < numCrates; j++) {
      if (line.charAt(j*4) === '[') {
        const arr = crates[j] || [];
        arr.unshift(line.charAt(j*4 + 1));
        crates[j] = arr;
      }
    }
  }

  return {crates, crateLine};
}

export function part1(example=false) {
  const inp = loadPuzzleInput("5", example, "2022");
  const {crates, crateLine} = parseCrates(inp);

  const instruction = /^move (\d+) from (\d+) to (\d+)$/
  for (let i = crateLine + 1; i < inp.length; i++) {
    const m = instruction.exec(inp[i]);
    const num = parseInt(m[1]), fromCrate = parseInt(m[2]), toCrate = parseInt(m[3]);
    for (let j = 0; j < num; j++) {
      crates[toCrate - 1].push(crates[fromCrate - 1].pop());
    }
  }
  return crates.map(c => c.pop() || '').join('');
}

export function part2(example=false) {
  const inp = loadPuzzleInput("5", example, "2022");

  const {crates, crateLine} = parseCrates(inp);

  const instruction = /^move (\d+) from (\d+) to (\d+)$/
  for (let i = crateLine + 1; i < inp.length; i++) {
    const m = instruction.exec(inp[i]);
    const num = parseInt(m[1]), fromCrateIdx = parseInt(m[2]), toCrateIdx = parseInt(m[3]);

    const fromCrate = crates[fromCrateIdx - 1];
    const toCrate = crates[toCrateIdx - 1];
    const toMove = fromCrate.splice(fromCrate.length - num);
    toCrate.push(...toMove);
  }
  return crates.map(c => c.pop() || '').join('');
}
