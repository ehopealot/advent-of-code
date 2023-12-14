import {part1, part2} from './day13';

describe("day 13", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(405);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(400);
    });
  });
});
