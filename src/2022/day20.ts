import {loadPuzzleInput} from '../lib/load_file';


function solve(input: Array<string>, rounds=1, key=1) {
  const inp = input.map(i => parseInt(i) * key)
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

  for (let k = 0; k < rounds; k++) {
    for (let i = 0; i < inp.length; i++) {
      const node = map[inp[i]].shift();

      const moves = node.val % (inp.length - 1);
      if (moves == 0) {
        map[inp[i]].push(node);
        continue;
      }
      const prev = node.prev;
      const next = node.next;

      if (moves < 0) {
        let cur = node;
        for (let j = 0; j < -1 * moves; j++) {
          cur = cur.prev;
        }
        next.prev = prev;
        prev.next = next;

        node.next = cur;
        node.prev = cur.prev;
        cur.prev.next = node;
        cur.prev = node;
      } else if (moves > 0) {
        let cur = node;
        for (let j = 0; j < moves; j++) {
          cur = cur.next;
        }
        next.prev = prev;
        prev.next = next;

        node.prev = cur;
        node.next = cur.next;
        cur.next.prev = node;
        cur.next = node;
      }
      map[inp[i]].push(node);
    }
  }

  let cur = map[0][0];
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

export function part1(example=false) {
  const inp = loadPuzzleInput("20", example, "2022");
  return solve(inp, 1, 1);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("20", example, "2022");
  return solve(inp, 10, 811589153);
}
