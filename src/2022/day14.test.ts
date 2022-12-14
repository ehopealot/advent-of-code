import {part1, part2} from './day14';

describe("day 14", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(24);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(93);
    });
  });
});
