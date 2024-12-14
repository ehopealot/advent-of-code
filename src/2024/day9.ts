import {loadPuzzleInput} from '../lib/load_file';

type FileRange = {
  start: number;
  length: number;
  fileId: number;
}

const parseInput = (inp: number[]) => {
  const files: FileRange[] = [];
  const free: FileRange[] = [];
  let file = true;
  let idx = 0;
  inp.forEach(length => {
    const list = file ? files : free;
    // dont care about fileId for free ranges but they
    // get one too
    list.push({start: idx, length: length, fileId: list.length});
    idx += length;
    file = !file;
  });
  return [files, free];
}

export function solve(inp: number[], part2 = false) {
 const [files, free] = parseInput(inp);
  const movedFiles: FileRange[] = [];
  while (files.length) {
    const lastFile = files.pop();
    let freeRange = free[0];
    let freeIdx = 0;
    if (part2) {
      // find the first free space big enough or
      // skip this file
      freeIdx = free.findIndex(range => range.length >= lastFile.length && range.start < lastFile.start);
      freeRange = free[freeIdx];
    }
    if (!freeRange || freeRange.start >= lastFile.start) {
      // nowhere to put it. "move" the file to the same place
      movedFiles.push(lastFile);
    } else if (lastFile.length <= freeRange.length) {
      // same for part1 and part2
      lastFile.start = freeRange.start;
      freeRange.length -= lastFile.length;
      freeRange.start += lastFile.length;
      movedFiles.push(lastFile);
      if (freeRange.length === 0) {
	free.splice(freeIdx, 1);
      }
    } else {
      // part 1 only -- move partial file
      free.splice(freeIdx, 1);
      freeRange.fileId = lastFile.fileId;
      lastFile.length -= freeRange.length;
      movedFiles.push(freeRange);
      files.push(lastFile);
    } 
  }
  // sum of [0, end of file] - sum of [0, start of file)
  const scoreFile = (file: FileRange) => {
    const endOfFile = file.start + file.length - 1;
    const beforeFile = file.start - 1;
    return file.fileId *
      (((endOfFile * (endOfFile + 1)) / 2) -
	((beforeFile * (beforeFile + 1)) / 2));
  }
  return movedFiles.reduce((total, file) => total + scoreFile(file), 0);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("9", example, "2024")[0].split("").map(i => parseInt(i));
  return solve(inp);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("9", example, "2024")[0].split("").map(i => parseInt(i));
  return solve(inp, true)
}
