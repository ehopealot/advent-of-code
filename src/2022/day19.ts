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

    const factories: Queue<RobotFactory> = new Queue<RobotFactory>();
    factories.add(factory);
    let maxGeodeSoFar = 0;
    let maxGeodeRobotsSoFar = 0;
    for (let i = 0; i < 32; i++) {

      while (factories.peek().minute === i) {
        const curFact = factories.dequeue();

        const oldOre = curFact.oreRobots;
        const oldClay = curFact.clayRobots;
        const oldObsidian = curFact.obsidianRobots;
        const oldGeodes = curFact.geodeRobots;

        const addResources = (factory: RobotFactory) => {

          factory.ore += oldOre;
          factory.clay += oldClay;
          factory.obsidian += oldObsidian;
          factory.geodes += oldGeodes;
          factory.minute = i + 1;
          if (factory.geodes > maxGeodeSoFar) {
            maxGeodeSoFar = factory.geodes;
          }
          if (factory.geodeRobots > maxGeodeRobotsSoFar) {
            maxGeodeRobotsSoFar = factory.geodeRobots;
          }

          if (factory.geodeRobots > maxGeodeRobotsSoFar - 2) {
            factories.enqueue(factory);
          }
        }

        const canBuildOre = curFact.ore >= bluePrint.oreOre;
        const canBuildClay = curFact.ore >= bluePrint.clayOre;
        const canBuildObsidian = curFact.clay >= bluePrint.obsidianClay && curFact.ore >= bluePrint.obsidianOre;
        const canBuildGeode = curFact.obsidian >= bluePrint.geodeObsidian && curFact.ore >= bluePrint.geodeOre;


        if (canBuildGeode) {
          const f = {...curFact};
          f.ore -= bluePrint.geodeOre;
          f.obsidian -= bluePrint.geodeObsidian;
          f.geodeRobots += 1;
          addResources(f);
        } else {

          if (canBuildObsidian) {
            const f = {...curFact};
            f.ore -= bluePrint.obsidianOre;
            f.clay -= bluePrint.obsidianClay;
            f.obsidianRobots += 1;
            addResources(f);
          }
            if (canBuildClay && i < 20) {
              const clayFactory = {...curFact};
              clayFactory.ore -= bluePrint.clayOre;
              clayFactory.clayRobots += 1;
              addResources(clayFactory);
            }
            if (canBuildOre && i < 10) {
              const oreFactory = {...curFact};
              oreFactory.ore -= bluePrint.oreOre;
              oreFactory.oreRobots += 1;
              addResources(oreFactory);
            }
          }
          addResources(curFact);
        }

    }
    score *= maxGeodeSoFar
    console.log(maxGeodeSoFar);
  });

  return score;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("19", example, "2022");
  return 0;
}
