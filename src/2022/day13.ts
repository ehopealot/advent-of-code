import {loadPuzzleInput} from '../lib/load_file';

function isNumber(item: PacketList | PacketNumber): item is PacketNumber {
  return (item as PacketNumber).val !== undefined;
}

class PacketNumber {
  val: number;
  constructor(num: number) {
    this.val = num;
  }

  toString() {
    return this.val.toString();
  }

  compare(other: PacketList | PacketNumber) {
    if (isNumber(other)) {
      return this.val - other.val;
    } else {
      throw Error('cmon man');
    }
  }

  toList() {
    return new PacketList(`[${this.val}]`.split(''));
  }
}

class PacketList {
  subPackets: Array<PacketList | PacketNumber>;
  wireLength: number;
  constructor(line: string[]) {
    this.subPackets = [];
    this.wireLength = 0;
    let num = "";
    for (let i = 1; i < line.length; i++) {
      if (line[i] === "[") {
        const subList = new PacketList([...line].slice(i));
        i += subList.wireLength;
        this.subPackets.push(subList);
      } else if (line[i] === "]") {
        if (num.length) {
          this.subPackets.push(new PacketNumber(parseInt(num)));
        }
        this.wireLength = i;
        return;
      } else if (line[i] === ",") {
        if (num.length) {
          this.subPackets.push(new PacketNumber(parseInt(num)));
          num = "";
        }
      } else {
        num += line[i];
      }
    }
  }

  toString() {
    return `[${this.subPackets.map(packet => packet.toString()).join(',')}]`;
  }

  compare(other: PacketList | PacketNumber) {
    for (let i = 0; i < this.subPackets.length; i++) {
      if (i > 0 && isNumber(other)) {
        return 1;
      }
      const myPacket = this.subPackets[i];
      const otherPacket = isNumber(other) ? other : other.subPackets[i];
      if (otherPacket === undefined) {
        return 1;
      }

      let val: number;
      if (isNumber(myPacket) && !isNumber(otherPacket)) {
        val = myPacket.toList().compare(otherPacket);
      } else if (!isNumber(myPacket) && isNumber(otherPacket)) {
        val = myPacket.compare(otherPacket.toList());
      } else {
        val = myPacket.compare(otherPacket);
      }
      if (val != 0) {
        return val
      }
    }
    if (isNumber(other) || this.subPackets.length == other.subPackets.length) {
      return 0;
    } else {
      return -1;
    }
  }
}


export function part1(example=false) {
  const inp = loadPuzzleInput("13", example, "2022");

  const packetPairs: Array<Array<PacketList>> = [];
  for (let i = 0; i < inp.length; i += 2) {
    const pair = [new PacketList(inp[i].split('')), new PacketList(inp[i+1].split(''))];
    packetPairs.push(pair);
  }

  return packetPairs.reduce((acc, [p1, p2], idx) => {
    const inOrder = p1.compare(p2) <= 0;

    return inOrder ? acc + idx + 1 : acc;
  }, 0);
}

export function part2(example=false) {
  const inp = loadPuzzleInput("13", example, "2022");

  const packets: Array<PacketList> = [];
  for (let i = 0; i < inp.length; i += 1) {
    packets.push(new PacketList(inp[i].split('')));
  }

  packets.push(new PacketList(`[[2]]`.split('')))
  packets.push(new PacketList(`[[6]]`.split('')))

  packets.sort((p1, p2) => p1.compare(p2));

  const idx1 = packets.findIndex(p => p.toString() === '[[2]]') + 1;
  const idx2 = packets.findIndex(p => p.toString() === '[[6]]') + 1;

  return idx1 * idx2;
}
