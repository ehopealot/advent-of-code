import {loadPuzzleInput} from '../lib/load_file';

const extraploate = (history: number[], extrapolateEnd = true) => {

  let done = false;
  const layers = [history];
  while (!done) {
    const layer = layers[layers.length-1];
    done = true;
    const newLayer: number[] = [];
    for (let i = 1; i < layer.length; i++) {
      const next = layer[i] - layer[i-1];

      done = done && (next === 0);
      newLayer.push(next);
    }
    layers.push(newLayer);
  }

  let layerIdx = layers.length - 2;

  let last = 0;
  while (layerIdx >= 0) {
    const layer = layers[layerIdx];
    last = extrapolateEnd ? last + layer[layer.length-1] : (layer[0] - last);
    layerIdx--;
  }
  console.log(last);
  return last;
}

export function part1(example=false) {
  const inp = loadPuzzleInput("9", example, "2023").map(line => line.split(' ').map(i => parseInt(i)));
  return inp.reduce((acc, history) => acc + extraploate(history), 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("9", example, "2023").map(line => line.split(' ').map(i => parseInt(i)));
  return inp.reduce((acc, history) => acc + extraploate(history, false), 0)
}
