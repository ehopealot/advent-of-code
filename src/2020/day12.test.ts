import {part1, part2} from './day12';

describe("day 12", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(25);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(286);
    });
  });
});
