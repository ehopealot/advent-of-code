import {part1, part2} from './day20';

describe("day 20", () => {
  describe("part1", () => {
    it("matches the example", () => {
      expect(part1(true)).toEqual(3);
    });
  });

  describe("part2", () => {
    it("matches the example", () => {
      expect(part2(true)).toEqual(1623178306);
    });
  });
});
