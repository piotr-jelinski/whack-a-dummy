import shuffle from "lodash.shuffle";
import { PawnMap, Pawns } from "./config";

export function generatePawnOccurrenceArray() {
  const pawns = Array.from(PawnMap.keys());
  const pawnOccurrences: Pawns[] = [];
  for (let i = 0; i < pawns.length; i++) {
    const pawn = pawns[i];
    const { occurrences } = PawnMap.get(pawn)!;
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

export default function delay<T>(value: T, ms: number) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}
