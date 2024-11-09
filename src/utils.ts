import shuffle from "lodash.shuffle";
import { pawnMap, Pawns } from "./config";

export function generatePawnOccurrenceArray() {
  const pawns = Array.from(pawnMap.keys());
  const pawnOccurrences: Pawns[] = [];
  for (let i = 0; i < pawns.length; i++) {
    const pawn = pawns[i];
    const { occurrences } = pawnMap.get(pawn)!;
    for (let j = 0; j < occurrences; j++) {
      pawnOccurrences.push(pawn);
    }
  }

  return pawnOccurrences;
}

export function* shuffledPawnGenerator(pawns: Pawns[]) {
  const shuffledPawns = shuffle(pawns);
  for (let i = 0; i < shuffledPawns.length; i++) {
    yield shuffledPawns[i];
  }
}

// separate audio files for each whack (hitting multiple pawns in quick succession should not cut off the sound)
export function playWhack() {
  const whackMp3 = new Audio("./sounds/whack.mp3");
  whackMp3.play();
}

// one audio file for all start sounds
const startMp3 = new Audio("./sounds/start.mp3");
export function playStart() {
  startMp3.play();
}

// one audio file for all end sounds
const endMp3 = new Audio("./sounds/end.mp3");
export function playEnd() {
  endMp3.play();
}
