import {part1, part2} from './day15';

describe("day 15", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(26);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(56000011);
    });
  });
});
