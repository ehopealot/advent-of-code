import {loadPuzzleInput} from '../lib/load_file';

const cardOrder = 'J23456789TQKA';
const cardScore = Object.fromEntries(cardOrder.split('').map((c, i) => [c, i]));

type Hand = {
  cards: string;
  handType: number;
  bid: number;
}

const parseHand = (hand: string) => {
  let[cards, bid] = hand.split(' ')
  const cardCounts: {[k: string]: number} = Object.fromEntries(Object.keys(cardScore).map(c => [c, 0]));
  for (let i = 0; i < cards.length; i++) {
    cardCounts[hand.charAt(i)] += 1;
  }

  const numJokers = cardCounts['J'];
  delete cardCounts['J'];
  const cardsAndCount = [...Object.entries(cardCounts)].sort(([card1, count1], [card2, count2]) => (
    count1 != count2 ? count1 - count2 : cardScore[card1] - cardScore[card2])).map(([_c, count]) => count);

  let count1 = cardsAndCount.pop();
  count1 += numJokers;

  const count2 = cardsAndCount.pop();
  const handType = count1 + (count2 > 1 ? .5 : 0);
  return {cards: cards, handType, bid: parseInt(bid)};
}

const compareHands = (hand1: Hand, hand2: Hand) => {
  if (hand1.handType != hand2.handType) {
    return hand1.handType - hand2.handType;
  }
  for (let i = 0; i < hand1.cards.length; i++) {
    const cardCompare = cardScore[hand1.cards.charAt(i)] - cardScore[hand2.cards.charAt(i)];
    if (cardCompare != 0) {
      return cardCompare
    }
  }
  return 0;
}

export function part1(example=false) {
  const hands = loadPuzzleInput("7", example, "2023").map(hand => parseHand(hand));
  hands.sort(compareHands);
  return hands.reduce((acc, hand, idx) => acc + (hand.bid * (idx + 1)), 0);
}

export function part2(example=false) {
  const hands = loadPuzzleInput("7", example, "2023").map(hand => parseHand(hand));
  hands.sort(compareHands);
  return hands.reduce((acc, hand, idx) => acc + (hand.bid * (idx + 1)), 0);
}
