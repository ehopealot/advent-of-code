import {loadPuzzleInput} from '../lib/load_file';
import {Queue} from 'typescript-collections';

const parseBlueprint = (bp: string): BluePrint => {
  const [id, oreOre, clayOre, obsidianOre, obsidianClay, geodeOre, geodeObsidian]  =  [...bp.matchAll(/(\d+)+/g)].map(m => parseInt(m[0]));
  return {id, oreOre, clayOre, obsidianOre, obsidianClay, geodeOre, geodeObsidian};
}

type BluePrint = {
  id: number;
  oreOre: number;
  clayOre: number;
  obsidianOre: number;
  obsidianClay: number;
  geodeOre: number;
  geodeObsidian: number;
}

type RobotFactory = {
  minute: number;
  ore: number;
  clay: number;
  obsidian: number;
  geodes: number;

  oreRobots: number;
  clayRobots: number;
  obsidianRobots: number;
  geodeRobots: number;
}

type RobotType = 'ore' | 'clay' | 'obsidian' | 'geode';

export function part1(example=false) {
  const inp = loadPuzzleInput("19", example, "2022");
  let score = 1;

  inp.forEach((line, idx) => {
    if (idx > 2) {
      return;
    }
    const bluePrint = parseBlueprint(line);
    const factory: RobotFactory = {
      minute: 0,
      ore: 0,
      clay: 0,
      obsidian: 0,
      geodes: 0,
      oreRobots: 1,
      clayRobots: 0,
      obsidianRobots: 0,
      geodeRobots: 0
    };

    let maxGeodeSoFar = 0;
    const dfs = (factory: RobotFactory, target: RobotType | null, minute: number) => {

      const delta = Math.min(32, minute) - factory.minute;
      factory.ore += (delta) * factory.oreRobots;
      factory.clay += (delta) * factory.clayRobots;
      factory.obsidian += (delta) * factory.obsidianRobots;
      factory.geodes += (delta) * factory.geodeRobots;
      factory.minute = Math.min(32, minute);

      if (minute >= 32) {
        if (factory.geodes > maxGeodeSoFar) {
          maxGeodeSoFar = factory.geodes;
        }
        return;
      }

      const timeToEnd = 32 - factory.minute;
      if (factory.geodes + factory.geodeRobots * timeToEnd + ((timeToEnd * (timeToEnd + 1)) / 2) < maxGeodeSoFar) {
        // trim search. abort impossible branches (even if you build a geode robot every subsequent turn you can't win
        return;
      }

      const targetOre = (f: RobotFactory) => {
        const timeToOre = 1 + Math.max(0, Math.ceil((bluePrint.oreOre - f.ore) / f.oreRobots));
        if (timeToOre != Infinity && f.obsidianRobots === 0) {
          dfs(f, 'ore', minute + timeToOre);
        }
      }
      const targetClay = (f: RobotFactory) => {
        const timeToClay = 1 + Math.max(0, Math.ceil((bluePrint.clayOre - f.ore) / f.oreRobots));
        if (timeToClay != Infinity && f.geodeRobots === 0) {
          dfs(f, 'clay', minute + timeToClay);
        }
      }
      const targetObsidian = (f: RobotFactory) => {
        const timeToObsidian = 1 + Math.max(0, Math.max(Math.ceil((bluePrint.obsidianOre - f.ore) / f.oreRobots), Math.ceil((bluePrint.obsidianClay - f.clay) / f.clayRobots)));
        if (timeToObsidian != Infinity) {
          dfs(f, 'obsidian', minute + timeToObsidian);
        }
      }
      const targetGeode = (f: RobotFactory) => {
        const timeToGeode = 1 + Math.max(0, Math.max(Math.ceil((bluePrint.geodeOre - f.ore) / f.oreRobots), Math.ceil((bluePrint.geodeObsidian - f.obsidian) / f.obsidianRobots)));
        if (timeToGeode != Infinity) {
          dfs(f, 'geode', minute + timeToGeode);
        }
      }

      const targetEverything = () => {
        targetGeode({...factory});
        targetObsidian({...factory});
        targetClay({...factory});
        targetOre({...factory});
        // go to the end
        dfs({...factory}, null, 32);
      }
      if (target === null) {
        targetEverything();
      } else if (target === 'ore') {
        factory.ore -= bluePrint.oreOre;
        factory.oreRobots += 1;
        targetEverything();
      } else if (target === 'clay') {
        factory.ore -= bluePrint.clayOre;
        factory.clayRobots += 1;
        targetEverything();
      } else if (target === 'obsidian') {
        factory.clay -= bluePrint.obsidianClay;
        factory.ore -= bluePrint.obsidianOre;
        factory.obsidianRobots += 1;
        targetEverything();
      } else {
        factory.ore -= bluePrint.geodeOre;
        factory.obsidian -= bluePrint.geodeObsidian;
        factory.geodeRobots += 1;
        targetEverything();
      }
    }

    dfs(factory, null, 1);
    score *= maxGeodeSoFar;
    console.log(maxGeodeSoFar);
  });


  return score;
}

export function part2(example=false) {
  return part1(example);
}
