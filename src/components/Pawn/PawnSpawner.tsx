import { useEffect, useMemo, useRef, useState } from "react";
import shuffle from "lodash.shuffle";
import Pawn from "../Pawn/Pawn";
import {
  activeHoleIndexArray,
  holeArray,
  PAWN_SPAWN_DELAY_MS,
  Pawns,
} from "../../config";
import styles from "./PawnSpawner.module.scss";
import {
  generatePawnOccurrenceArray,
  shuffledPawnGenerator,
} from "../../utils";

const pawnOccurrenceArray = generatePawnOccurrenceArray();

// type PawnSpawnerProps = {};

export default function PawnSpawner() {
  const availableHoles = useRef(shuffle(activeHoleIndexArray));
  const [pawns, setPawns] = useState<Map<number, Pawns>>(new Map());
  const pawnsGenerator = useMemo(
    () => shuffledPawnGenerator(pawnOccurrenceArray),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (availableHoles.current.length === 0) {
        return;
      }

      const { done, value } = pawnsGenerator.next();
      if (!done && value) {
        const holeIndex = availableHoles.current.pop()!;
        setPawns((pawns) => new Map(pawns).set(holeIndex, value));
      }
    }, PAWN_SPAWN_DELAY_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.spawner}>
      {holeArray.map((isActive, index) => {
        const pawn = pawns.get(index);

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
