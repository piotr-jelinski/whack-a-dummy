import Pawn from "../Pawn/Pawn";
import { HOLE_COUNT, Pawns } from "../../config";
import styles from "./PawnSpawner.module.scss";
import {
  generatePawnOccurrenceArray,
  shuffledPawnGenerator,
} from "../../utils";
import { useMemo } from "react";

const pawnOccurrenceArray = generatePawnOccurrenceArray();

type PawnSpawnerProps = {};

export default function PawnSpawner() {
  const pawnsGenerator = useMemo(
    () => shuffledPawnGenerator(pawnOccurrenceArray),
    []
  );

  return (
    <div className={styles.spawner}>
      {Array.from({ length: HOLE_COUNT }).map((_, index) => {
        const pawn = pawnsGenerator.next().value;
        return pawn && (index + 1) % 2 === 1 ? (
          <div className={styles.field} key={index}>
            <Pawn pawn={pawn} />
          </div>
        ) : (
          <div key={index} />
        );
      })}
    </div>
  );
}
