import {loadPuzzleInput} from '../lib/load_file';


function runCommands(inp: string[]): {[k: string]: number} {
  const files: {[k: string]: boolean} = {};
//  const dirs: {[k: string]: number} = {};
  const navstack: string[] = [''];

  return inp.reduce((dirs, line) => {
    const dirPath = navstack.join('/');
    if (line.startsWith('$ cd ')) {
      const directory = line.slice(5);
      if (directory === '/') {
        navstack.length = 1;
      } else if (directory === '..') {
        navstack.pop();
      } else {
        navstack.push(directory);
      }
    } else if (line.startsWith('$ ls') || line.startsWith('dir')) {
      // continue
    } else {
      const [size, name] = line.split(' ');
      if (!files[dirPath + '/' + name]) {
        files[dirPath + '/' + name] = true;
        const parentDirs = [...navstack];
        while (parentDirs.length > 0) {
          const parentDirSize = dirs[parentDirs.join('/')] || 0;
          dirs[parentDirs.join('/')] = parentDirSize + parseInt(size);
          parentDirs.pop();
        }
      }
    }
    return dirs;
  }, {});
}

export function part1(example=false) {
  const inp = loadPuzzleInput("7", example, "2022");

  const dirs = runCommands(inp);

  return Object.values(dirs).reduce((acc, val) => val > 100000 ? acc : acc + val, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("7", example, "2022");

  const dirs = runCommands(inp);
  const spaceNeeded = Math.max(0, 30000000 - (70000000 - dirs['']));
  return Object.values(dirs).reduce((smallestDirSoFar, dirSize) =>
    (dirSize < smallestDirSoFar && dirSize > spaceNeeded) ? dirSize : smallestDirSoFar
  , Number.MAX_SAFE_INTEGER);
}
