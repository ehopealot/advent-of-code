import {part1, part2} from './day11';

describe("day 11", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(374);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(1030);
    });
  });
});
