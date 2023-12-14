import {loadPuzzleInput} from '../lib/load_file';

const findReflection = (pattern: string[], multiplier = 1) => {
  for (let i = 1; i < pattern.length; i++) {
    let offset = 0;
    while (i + offset < pattern.length && i - offset > 0) {
      if (pattern[i + offset] === pattern[i - offset - 1]) {
        offset += 1;
      } else {
        break;
      }
    }
    if (i + offset === pattern.length || i - offset === 0) {
      return i * multiplier;
    }
  }
  return 0;
}

export function part1(example=false) {
  const [inp] = loadPuzzleInput("13", example, "2023", false);

  const patterns = inp.split(/\n\n/).map(pattern => pattern.split('\n').filter(l => l.length > 0));

  const patternsRotated = patterns.map(pattern => {
    return pattern[0].split('').map((_, idx) => pattern.map(row => row[idx]).join(''));
  });

  return patterns.reduce((acc, p) => findReflection(p, 100) + acc, 0) +
    patternsRotated.reduce((acc, p) => findReflection(p) + acc, 0)
}

const findReflectionSmudged = (pattern: string[], multiplier = 1) => {
  const distance = (s1: string, s2: string) => {
    let dist = 0;
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] !== s2[i]) {
        dist += 1;
      }
    }
    if (dist > 1) {
      // doesnt matter what this value is as long as it's > 1
      return 2;
    }
    return dist;
  }

  for (let i = 1; i < pattern.length; i++) {
    let offset = 0;
    let cumulativeDistance = 0;
    while (i + offset < pattern.length && i - offset > 0) {
      const dist = distance(pattern[i + offset], pattern[i - offset - 1]);
      cumulativeDistance += dist;
      if (cumulativeDistance <= 1) {
        offset += 1;
      } else {
        break;
      }
    }
    if (cumulativeDistance === 1 && (i + offset === pattern.length || i - offset === 0)) {
      return i * multiplier;
    }
  }
  return 0;
}


export function part2(example=false) {
  const [inp] = loadPuzzleInput("13", example, "2023", false);

  const patterns = inp.split(/\n\n/).map(pattern => pattern.split('\n').filter(l => l.length > 0));

  const patternsRotated = patterns.map(pattern => {
    return pattern[0].split('').map((_, idx) => pattern.map(row => row[idx]).join(''));
  });
//  console.log(patternsRotated.map(p => p.join('\n')).join('\n\n'));
  return patterns.reduce((acc, p) => findReflectionSmudged(p, 100) + acc, 0) +
    patternsRotated.reduce((acc, p) => findReflectionSmudged(p) + acc, 0)
}
