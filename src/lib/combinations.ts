
export function* combinations(arr: number[], startIdx: number, depth: number, sofar: number[]) {
  if (depth === 0) {
    yield [];
  }
  if (depth === 1) {
    for (let i = startIdx; i < arr.length; i++) {
      yield [...sofar, arr[i]];
    }
  } else {
    for (let i = startIdx; i < arr.length; i++) {
      yield * combinations(arr, i+1, depth - 1, [...sofar, arr[i]]);
    }
  }
}

