import {loadPuzzleInput} from '../lib/load_file'

export function part1(example=false) {
  const inp = loadPuzzleInput("14", example, "2020");
  const reg = /mem\[(\d+)\] = (\d+)/;
  let mask = "";
  const memory: {[k: number]: bigint} = {};
  inp.forEach(cmd => {
    if (cmd.startsWith("mask = ")) {
      mask = cmd.slice(7);
    } else if (cmd.startsWith("mem")) {
      const res = reg.exec(cmd);
      const register = res[1];
      let val = BigInt(parseInt(res[2]));
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] == '1') {
          const mask = 1n << BigInt(35 - i);
          val |= mask;
        } else if (mask[i] == '0') {
          const mask = BigInt(2 ** 36 - 1) - BigInt(2 ** (35 - i));
          val &= mask;
        }
      }
      memory[register] = val;
    }
  });

  return Number(Object.values(memory).reduce((acc, val) => acc + val, 0n));
}

function recurse(register: bigint, val: bigint, mask: string, idx: number, memory: {[k: number]: bigint}) {
  if (idx == mask.length) {
    memory[Number(register)] = val;
    return;
  }
  for (let i = idx; i < mask.length; i++) {
    if (mask[i] == '1') {
      const mask = 1n << BigInt(35 - i);
      register |= mask;
    } else if (mask[i] == '0') {
      // const mask = BigInt(2 ** 36 - 1) - BigInt(2 ** (35 - i));
      // register &= mask;
    } else {
      let bitMask = 1n << BigInt(35 - i);
      let nextReg = register | bitMask;
      recurse(nextReg, val, mask, i + 1, memory);
      bitMask = BigInt(2 ** 36 - 1) - BigInt(2 ** (35 - i));
      nextReg = register & bitMask;
      recurse(nextReg, val, mask, i + 1, memory);
      return;
    }
  }
  memory[Number(register)] = val;
}

export function part2(example=false) {
  const inp = loadPuzzleInput("14", example, "2020");
  const reg = /mem\[(\d+)\] = (\d+)/;
  let mask = "";
  const memory: {[k: number]: bigint} = {};
  inp.forEach(cmd => {
    if (cmd.startsWith("mask = ")) {
      mask = cmd.slice(7);
    } else if (cmd.startsWith("mem")) {
      const res = reg.exec(cmd);
      const register = res[1];
      let val = BigInt(parseInt(res[2]));
      recurse(BigInt(register), val, mask, 0, memory);
    }
  });

  return Number(Object.values(memory).reduce((acc, val) => acc + val, 0n));
}
