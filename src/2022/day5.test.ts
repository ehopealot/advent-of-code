import {part1, part2} from './day5';

describe("day 5", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual('CMZ');
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual('MCD');
    });
  });
});
