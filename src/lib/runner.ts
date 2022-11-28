import * as path from 'path';

const args = process.argv.slice(2);
const day = args.shift();
const part = args.shift();
const year = args.shift() || '2022';

const start = performance.now();
if (part === '1') {
  console.log(require(path.resolve(__dirname, `../${year}/day${day}.ts`)).part1());
  console.log(`Part 1 time (ms): ${performance.now() - start}`);
} else {
  console.log(require(path.resolve(__dirname, `../${year}/day${day}.ts`)).part2());
  console.log(`Part 2 time (ms): ${performance.now() - start}`);
}
