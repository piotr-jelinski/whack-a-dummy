import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import shuffle from "lodash.shuffle";
import Pawn from "../Pawn/Pawn";
import {
  activeHoleIndexArray,
  holeArray,
  MAX_PAWNS_ON_BOARD,
  PAWN_SPAWN_DELAY_MS,
  START_PAWNS_ON_BOARD,
  Pawns,
} from "../../config";
import styles from "./PawnSpawner.module.scss";
import {
  generatePawnOccurrenceArray,
  shuffledPawnGenerator,
} from "../../utils";

const pawnOccurrenceArray = generatePawnOccurrenceArray();

type PawnSpawnerProps = {
  stop: () => void;
};

export default function PawnSpawner({ stop }: PawnSpawnerProps) {
  const availableHoles = useRef(shuffle(activeHoleIndexArray));
  const [pawns, setPawns] = useState<Map<number, Pawns>>(new Map());

  const pawnsGenerator = useMemo(
    () => shuffledPawnGenerator(pawnOccurrenceArray),
    []
  );

  const deployPawn = useCallback(() => {
    if (
      availableHoles.current.length === 0 ||
      activeHoleIndexArray.length - availableHoles.current.length >=
        MAX_PAWNS_ON_BOARD
    ) {
      return;
    }

    const { done, value } = pawnsGenerator.next();
    if (done) {
      stop();
      return;
    }

    const holeIndex = availableHoles.current.pop()!;
    setPawns((pawns) => new Map(pawns).set(holeIndex, value));
  }, [pawnsGenerator, setPawns, stop]);

  const popPawn = useCallback(
    (index: number) => () => {
      availableHoles.current = shuffle([...availableHoles.current, index]);
      setPawns((pawns) => {
        const newPawnMap = new Map(pawns);
        newPawnMap.delete(index);

        return newPawnMap;
      });
      deployPawn();
    },
    [deployPawn, setPawns]
  );

  useEffect(() => {
    for (let i = 0; i < START_PAWNS_ON_BOARD - 1; i++) {
      deployPawn();
    }

    const interval = setInterval(deployPawn, PAWN_SPAWN_DELAY_MS);

    return () => clearInterval(interval);
  }, [deployPawn]);

  return (
    <div className={styles.spawner}>
      {holeArray.map((isActive, index) => {
        const pawn = pawns.get(index);

        return pawn && isActive ? (
          <div className={styles.field} key={`${index}-${pawn}`}>
            <Pawn pawn={pawn} remove={popPawn(index)} />
          </div>
        ) : (
          <div key={index} />
        );
      })}
    </div>
  );
}
