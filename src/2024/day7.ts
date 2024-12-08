import { toString } from 'typescript-collections/dist/lib/arrays';
import { combinations } from '../lib/combinations';
import {loadPuzzleInput} from '../lib/load_file';

const evaluateInner = (equation: string[]) => {
  let total = 0;
  const plus = (a, b) => a+b;
  const mult = (a, b) => a*b;
  const concat = (a, b) => parseInt(a.toString() + b.toString());
  let op = plus;
  equation.forEach((val, idx) => {
    if (val === '+') {
      op = plus;
    } else if (val === '*') {
      op = mult;
    } else if (val === '||') {
      op = concat;
    } else {
      // its a number
      total = op(total, parseInt(val));
    }
  });
  return total;
}

const evaluate = (equation: string[], target: number, part2: boolean = false) => {
  const indices = [];
  for (let i = 1; i < equation.length; i+= 2) {
    indices.push(i);
  }
  for (let i = 0; i <= indices.length; i++) {
    const iter = combinations(indices, 0, i, []);
    while (true) {
      const next = iter.next();
      if (next.value === undefined) {
	break;
      }
      const copy = [...equation];
      next.value.forEach(val => {
	copy[val] = '+';
      });
      if (part2) {
	for (let j = 0; j <= next.value.length; j++) {
	  const iter2 = combinations(next.value, 0, j, []);
	  while(true) {
	    const next2 = iter2.next();
	    if (next2.value === undefined) {
	      break;
	    }
	    const copy2 = [...copy];
	    next2.value.forEach(val => {
	      copy2[val] = '||';
	    });
	    if (evaluateInner(copy2) === target) {
	      return target;
	    }
	  }
	}
      } 
      if (evaluateInner(copy) === target) {
	return target;
      }
    }
  }
  return 0;
}

const processLine = (line: string, part2: boolean = false) => {
  let [target, rest] = line.split(': ')
  const targetNum = parseInt(target);
  const equation = rest.split(' ');
  for (let i = 1; i < equation.length; i += 2) {
    equation.splice(i, 0, '*');
  }
  return evaluate(equation, targetNum, part2);
}

export function part1(example=false) {
  const inp = loadPuzzleInput("7", example, "2024");
  let total = 0;
  inp.forEach(line => {
    total += processLine(line);
  });
  return total;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("7", example, "2024");
  let total = 0;
  inp.forEach(line => {
    total += processLine(line, true);
  });
  return total;
}
