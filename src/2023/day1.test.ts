import {part1, part2} from './day1';

describe("day 1", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(142);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(281);
    });
  });
});
