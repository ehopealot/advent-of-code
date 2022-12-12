import {loadPuzzleInput} from '../lib/load_file';

const parseMonkey = (lines: Array<string>) => {
  const items = lines[0].match(/(\d+)/g).map(n => parseInt(n));
  const [_, opStr, amountStr] = lines[1].match(/(\*|\+) (\d+|old)/);

  const func = (n: number) => {
    if (amountStr === 'old') {
      return opStr === '*' ? n * n : n + n
    } else {
      return opStr === '*' ? n * parseInt(amountStr) : n + parseInt(amountStr)
    }
  };

  const lastNumFinder = /(\d+)$/g;
  const testDivisible = parseInt(lines[2].match(lastNumFinder)[0]);
  const ifTrue = parseInt(lines[3].match(lastNumFinder)[0]);
  const ifFalse = parseInt(lines[4].match(lastNumFinder)[0]);

  return {
    items,
    func,
    testDivisible,
    ifTrue,
    ifFalse,
  }
}

export function part1(example=false) {
  const inp = loadPuzzleInput("11", example, "2022");

  const monkeys: ReturnType<typeof parseMonkey>[] = [];
  for (let i = 0; i < inp.length; i += 6) {
    monkeys.push(parseMonkey([...inp].slice(i+1, i+6)));
  }

  let scores: number[] = new Array(monkeys.length).fill(0);
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey, idx) => {
      while (monkey.items.length > 0) {
        const level = Math.floor(monkey.func(monkey.items.shift()) / 3);
        monkeys[level % monkey.testDivisible === 0 ? monkey.ifTrue : monkey.ifFalse].items.push(level);
        scores[idx] += 1;
      }
    });
  }

  return scores.sort((a, b) => b - a).slice(0, 2).reduce((acc, num) => acc * num, 1);
}

const parseMonkey2 = (lines: Array<string>) => {
  const items = lines[0].match(/(\d+)/g).map(n => ({original: parseInt(n)}));
  const [_, opStr, amountStr] = lines[1].match(/(\*|\+) (\d+|old)/);

  const func = (n: number) => {
    if (amountStr === 'old') {
      return opStr === '*' ? n * n : n + n
    } else {
      return opStr === '*' ? n * parseInt(amountStr) : n + parseInt(amountStr)
    }
  };

  const lastNumFinder = /(\d+)$/g;
  const testDivisible = parseInt(lines[2].match(lastNumFinder)[0]);
  const ifTrue = parseInt(lines[3].match(lastNumFinder)[0]);
  const ifFalse = parseInt(lines[4].match(lastNumFinder)[0]);

  return {
    items,
    func,
    testDivisible,
    ifTrue,
    ifFalse,
  }
}


export function part2(example=false) {
  const inp = loadPuzzleInput("11", example, "2022");

  const monkeys: ReturnType<typeof parseMonkey2>[] = [];
  for (let i = 0; i < inp.length; i += 6) {
    monkeys.push(parseMonkey2([...inp].slice(i+1, i+6)));
  }

  // theres better ways to do this but this sets up each item as a map
  // of each monkey's divisibility test number => the value of that
  // item mod that number.
  for (let i = 0; i < monkeys.length; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      monkeys[i].items.forEach(item => {
        item[monkeys[j].testDivisible] = item.original % monkeys[j].testDivisible;
      });
    }
  }

  // clean up "original" from the maps
  monkeys.forEach(monk => monk.items.forEach(item => delete item.original));

  let scores: number[] = new Array(monkeys.length).fill(0);
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey, idx) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift();
        Object.keys(item).forEach(divisor => {
          // update all the divisor trackers with the current monkey's func
          item[divisor] = (monkey.func(item[divisor]) % parseInt(divisor));
        });
        if (item[monkey.testDivisible] === 0) {
          monkeys[monkey.ifTrue].items.push(item);
        } else {
          monkeys[monkey.ifFalse].items.push(item);
        }
        scores[idx] += 1;
      }
    });

  }
  return scores.sort((a, b) => b - a).slice(0, 2).reduce((acc, num) => acc * num, 1);
}
