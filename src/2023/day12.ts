import {loadPuzzleInput} from '../lib/load_file';

const parseRecord = (record: string, repeats = 1) => {
  const [conditions, sizes] = record.split(' ');
  let newConditions = conditions;
  const originalSizes = sizes.split(',').map(i => parseInt(i));
  let newSizes = [...originalSizes];
  for (let i = 0; i < repeats -1; i++) {
    newSizes = newSizes.concat(originalSizes);
    newConditions += ('?' + conditions);
  }

  // trim unnecessary '.' from the beginning and end
  let s = 0;
  for (let i = 0; newConditions.charAt(i) === '.'; i++) {
    s++;
  }
  let e = newConditions.length - 1;
  for (let i = newConditions.length-1; newConditions.charAt(i) === '.'; i--) {
    e--;
  }

  // add a '.' to the end to make the regexes easier
  return {conditions: newConditions.substring(s, e+1) + '.', sizes: newSizes};
}

const search = (conditions: string, sizes: number[], sizeIdx: number, pos: number, seen: {[k: string]: number}) => {

  if (sizeIdx === sizes.length) {
    // base case, zero broken springs to allocate
    if (!conditions.includes('#', pos)) {
      // its a valid configuration -- theres no more broken springs on the plan
      return 1;
    }
    // invalid. if there's no more runs of broken springs but still broken springs in the plan
    return 0;
  }

  const sizeNeeded = sizes[sizeIdx];
  const key = `${sizeIdx},${pos}`;
  if (seen[key] !== undefined) {
    return seen[key];
  }

  const needed = new RegExp(`^(\\?|#){${sizeNeeded}}[^#]`)
  const starts: number[] = [];
  let firstPound = conditions.indexOf('#', pos);
  // reasoning: ou have to include the next '#' in the next run of broken springs, you can't
  // skip it. So only runs which include it can be searched further.
  if (firstPound === -1) {
    firstPound = Number.MAX_SAFE_INTEGER;
  } else {
    firstPound += 1;
  }

  // find all the possible places for the current size
  for (let i = pos; i < Math.min(firstPound, conditions.length); i++) {
    if (conditions.substring(i).match(needed)) {
      // starts are where to start looking for the _next_ run of broken springs. Meaning the current position, plus the 
      // length of the current run being placed, plus 1, since all runs are separated by a working spring. 
      starts.push(i + sizeNeeded + 1);
    }
  }

  // answer is sum of products of all the possibilities for each
  // possible position of the current size (some of which are impossible
  // and thus zero)
  const sum = starts.reduce((acc, start) => (search(conditions, sizes, sizeIdx + 1, start, seen)) + acc, 0);
  // memo key is the specific run of broken springs (sizeIdx) and the position in the configuration
  seen[key] = sum;
  return sum;
}


export function part1(example=false) {
  const inp = loadPuzzleInput("12", example, "2023").map(r => parseRecord(r));
  console.log(inp);

  const answer = inp.map(({conditions, sizes}) => {
    let start = 0;
    return search(conditions, sizes, 0, start, {});
  });

  return answer.reduce((acc, n) => acc + n, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("12", example, "2023").map(r => parseRecord(r, 5));

  const answer = inp.map(({conditions, sizes}) => {
    console.log('searching...');
    return search(conditions, sizes, 0, 0, {});
  });

  return answer.reduce((acc, n) => acc + n, 0);
}
