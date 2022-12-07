import {part1, part2} from './day7';

describe("day 7", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(95437);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(24933642);
    });
  });
});
