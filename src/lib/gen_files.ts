import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as stream from 'stream';
import axios from 'axios';
import {promisify} from 'util';

const genFiles = async () => {
  const args = process.argv.slice(2);
  const day = args.shift();

  const year = args.shift() || '2022';

  if (!fs.existsSync(`./src/${year}`)) {
    fs.mkdirSync(`./src/${year}`);
  }
  if (!fs.existsSync(`./inputs/${year}`)) {
    fs.mkdirSync(`./inputs/${year}`);
  }

  const inputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const dest = `./inputs/${year}/day${day}.txt`;

  const done = promisify(stream.finished);

  const downloadFile = async () => {
    const resp = await axios({ method: "get", url: inputUrl,responseType: "stream", headers: { Cookie: "session=53616c7465645f5f69c805edae57a9903e03c43e389f01adb918aeb1523072367a4bacfe5eba9dc122baa385a66a427d5d5291b5ecf698636d46e0116c756a25" }});
    const stream = fs.createWriteStream(dest);
    resp.data.pipe(stream);
    return done(stream);
  }

  await downloadFile();

  const codePath = `./src/${year}/day${day}.ts`;
  const testPath = `./src/${year}/day${day}.test.ts`;

  const sourceContent = `import {loadPuzzleInput} from '../lib/load_file'

export function part1(example=false) {
  const inp = loadPuzzleInput("${day}", example, "${year}");
  return 0;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("${day}", example, "${year}");
  return 0;
}
`;

  fs.writeFileSync(codePath, sourceContent);

  const testContent = `import {part1, part2} from './day${day}';

describe("day ${day}", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(0);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(0);
    });
  });
});
`;

  fs.writeFileSync(testPath, testContent);
};

genFiles();
