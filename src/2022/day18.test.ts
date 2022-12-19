import {part1, part2} from './day18';

describe("day 18", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(64);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(58);
    });
  });
});
