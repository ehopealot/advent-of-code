import {part1, part2} from './day3';

describe("day 3", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(157);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(70);
    });
  });
});
