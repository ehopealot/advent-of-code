import * as fs from 'fs';
import * as path from 'path';

export function loadPuzzleInput(day: string, example: boolean, year: string, splitLines = true) {
  const input = fs.readFileSync(path.resolve(__dirname, `../../inputs/${year}/day${day}${example ? '-example' : ''}.txt`), 'utf8');
  if (splitLines) {
    return input.split(/\r\n|\n/).filter(l => !!l);
  } else {
    return [input];
  }
}
