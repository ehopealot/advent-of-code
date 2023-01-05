import {loadPuzzleInput} from '../lib/load_file';

export function part1(example=false) {
  const inp = loadPuzzleInput("20", example, "2022").map(i => parseInt(i));
  type Node = {
    val: number;
    next: Node | null;
    prev: Node | null;
  }

  let head = {
    val: inp[0],
    next: null,
    prev: null,
  }

  const map: {[k: number]: Array<Node>} = {};
  map[inp[0]] = [head];
  let prev = head;

  for (let i = 1; i < inp.length; i++) {
    const next = {
      val: inp[i],
      next: null,
      prev: prev,
    }
    if (!map[inp[i]]) {
      map[inp[i]] = [];
    }
    map[inp[i]].push(next);
    prev.next = next;
    prev = next;
  }
  prev.next = head;
  head.prev = prev;

  for (let i = 0; i < inp.length; i++) {
    const node = inp[i] === 0 ? map[0][0] : map[inp[i]].shift();

    const moves = node.val;
    if (moves < 0) {
      for (let j = -1; j >= moves; j--) {
        const prev = node.prev;
        const next = node.next;

        next.prev = prev;
        prev.next = next;


        prev.prev.next = node;
        node.next = prev;
        node.prev = prev.prev;
        prev.prev = node;
      }
    } else if (moves > 0) {
      for (let j = 0; j < moves; j++) {
        const prev = node.prev;
        const next = node.next;

        next.prev = prev;
        prev.next = next;

        next.next.prev = node;
        node.next = next.next;
        node.prev = next;
        next.next = node;
      }
    }
  }

  let cur = map[0][0];
  console.log(cur);
  let ans = 0;
  for (let i = 1; i <= 3000; i++) {
    cur = cur.next;
    if (i % 1000 === 0) {
      console.log(cur.val);
      ans += cur.val;
    }
  }
  return ans;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("20", example, "2022");
  return 0;
}
