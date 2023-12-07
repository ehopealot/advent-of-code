import {loadPuzzleInput} from '../lib/load_file';

const HIGH_CARD = 0;
const ONE_PAIR = 1;
const TWO_PAIR = 2;
const THREE_OF_A_KIND = 3;
const FULL_HOUSE = 4;
const FOUR_OF_A_KIND = 5;
const FIVE_OF_A_KIND = 6;

const cardScore = {
  J: -1,
  2: 0,
  3: 1,
  4: 2,
  5: 3,
  6: 4,
  7: 5,
  8: 6,
  9: 7,
  T: 8,
  Q: 10,
  K: 11,
  A: 12,
}

const parseHand = (hand: string) => {
  let[cards, bid] = hand.split(' ')
  const cardCounts = {};
  for (let i = 0; i < cards.length; i++) {
    const card = hand.charAt(i);
    if (cardCounts[card] === undefined) {
      cardCounts[card] = 0;
    }
    cardCounts[card] += 1;
  }

  const numJokers = cardCounts['J'] || 0;
  delete cardCounts['J'];
  let topCard = 'A';
  let topCount = 0;
  Object.keys(cardCounts).forEach(card => {
    if (cardCounts[card] > topCount) {
      topCount = cardCounts[card];
      topCard = card;
    } else if (cardCounts[card] === topCount) {
      if (cardScore[card] > cardScore[topCard]) {
        topCard = card;
      }
    }
  });

  if (!cardCounts[topCard]) {
    cardCounts[topCard] = 0;
  }
  cardCounts[topCard] += numJokers;

  const counts = Object.values(cardCounts);

  let handType = HIGH_CARD;
  if (counts.findIndex(c => c === 5) !== -1) {
    console.log(counts);
    handType = FIVE_OF_A_KIND;
  } else if (counts.findIndex(c => c === 4) !== -1) {
    handType = FOUR_OF_A_KIND;
  } else if (counts.findIndex(c => c === 3) !== -1) {
    if (counts.findIndex(c => c === 2) !== -1) {
      handType = FULL_HOUSE;
    } else {
      handType = THREE_OF_A_KIND
    }
  } else {
    const numPairs = counts.filter(c => c === 2).length;
    if (numPairs === 2) {
      handType = TWO_PAIR;
    } else if (numPairs === 1) {
      handType = ONE_PAIR;
    } else {
      handType = HIGH_CARD;
    }
  }

  return {cards: cards, handType, bid: parseInt(bid)};
}

type Hand = {
  cards: string;
  handType: number;
  bid: number;
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
  console.log(hands);
  return hands.reduce((acc, hand, idx) => acc + (hand.bid * (idx + 1)), 0);
}
