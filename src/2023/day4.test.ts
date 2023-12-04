import {part1, part2} from './day4';

describe("day 4", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(13);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(30);
    });
  });
});
