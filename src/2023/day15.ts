import {loadPuzzleInput} from '../lib/load_file';

const hash = (label: string) => {
  let sum = 0;
  for (let c = 0; c < label.length; c++) {
    sum += label.charCodeAt(c);
    sum *= 17;
    sum %= 256;
  }
  return sum;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("15", example, "2023");

  const steps = inp[0].split(',');

  return steps.reduce((acc, step) => {
    let sum = 0;
    for (let c = 0; c < step.length; c++) {
      sum += step.charCodeAt(c);
      sum *= 17;
      sum %= 256;
    }
//    console.log(`${step}: ${sum}`);
    return acc + sum;
  }, 0);
}


export function part2(example=false) {
  const inp = loadPuzzleInput("15", example, "2023");

  const boxes: string[][] = [];
  const lensLookup: {[k: string]: number} = {};
  const focalLength: {[k: string]: number} = {};
  for (let i = 0; i < 256; i++) {
    boxes.push([]);
  }

  const steps = inp[0].split(',');
  steps.forEach(step => {
    if (step.includes('-')) {
      // subtract
      const label = step.split("-")[0];
      const boxIdx = hash(label);
      if (lensLookup[label] !== undefined) {
        const box = boxes[boxIdx];
        box.splice(box.findIndex(item => item === label), 1);
        delete lensLookup[label];
      }
    } else {
      const [label, focal] = step.split("=");
      // add
      const box = hash(label);
      focalLength[label] = parseInt(focal);
      if (lensLookup[label] === undefined) {
        lensLookup[label] = box;
        boxes[box].push(label);
      }
    }
  });

  return Object.entries(lensLookup).reduce((acc, [lens, box]) => (
    acc + (box + 1) * (boxes[box].findIndex(l => l === lens) + 1) * focalLength[lens]
  ), 0);

}
