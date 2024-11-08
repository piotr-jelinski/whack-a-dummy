import Pawn from "../Pawn/Pawn";
import { holeArray } from "../../config";
import styles from "./PawnSpawner.module.scss";
import {
  generatePawnOccurrenceArray,
  shuffledPawnGenerator,
} from "../../utils";
import { useMemo } from "react";

const pawnOccurrenceArray = generatePawnOccurrenceArray();

// type PawnSpawnerProps = {};

export default function PawnSpawner() {
  const pawnsGenerator = useMemo(
    () => shuffledPawnGenerator(pawnOccurrenceArray),
    []
  );

  return (
    <div className={styles.spawner}>
      {holeArray.map((isActive, index) => {
        const pawn = pawnsGenerator.next().value;
        return pawn && isActive ? (
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
