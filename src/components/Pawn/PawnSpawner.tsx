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
  GameStates,
} from "../../config";
import {
  generatePawnOccurrenceArray,
  shuffledPawnGenerator,
} from "../../utils";
import styles from "./PawnSpawner.module.scss";

const pawnOccurrenceArray = generatePawnOccurrenceArray();

type PawnSpawnerProps = {
  addScore: (points: number) => void;
  stop: () => void;
};
type PawnMapValue = {
  date: number;
  value: Pawns;
};

function PawnSpawner({ addScore, stop }: PawnSpawnerProps) {
  const availableHolesRef = useRef(shuffle(activeHoleIndexArray));
  const isDoneRef = useRef(false);
  const [pawns, setPawns] = useState<Map<number, PawnMapValue>>(new Map());

  const pawnsGenerator = useMemo(
    () => shuffledPawnGenerator(pawnOccurrenceArray),
    []
  );

  const deployPawn = useCallback(() => {
    if (
      availableHolesRef.current.length === 0 ||
      activeHoleIndexArray.length - availableHolesRef.current.length >=
        MAX_PAWNS_ON_BOARD
    ) {
      return;
    }

    const { done, value } = pawnsGenerator.next();
    if (done) {
      isDoneRef.current = true;
      return;
    }

    const holeIndex = availableHolesRef.current.pop()!;
    setPawns((pawns) =>
      new Map(pawns).set(holeIndex, { date: Date.now(), value })
    );
  }, [pawnsGenerator, setPawns]);

  const popPawn = useCallback(
    (index: number) => {
      availableHolesRef.current = shuffle([
        ...availableHolesRef.current,
        index,
      ]);
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
    for (let i = 0; i < START_PAWNS_ON_BOARD; i++) {
      deployPawn();
    }

    const interval = setInterval(deployPawn, PAWN_SPAWN_DELAY_MS);

    return () => clearInterval(interval);
  }, [deployPawn]);

  useEffect(() => {
    if (isDoneRef.current && pawns.size === 0) {
      stop();
    }
  }, [pawns, stop]);

  return (
    <div className={styles.spawner}>
      {holeArray.map((isActive, index) => {
        const pawn = pawns.get(index);

        return pawn && isActive ? (
          <div
            className={styles.field}
            key={`${index}-${pawn.value}-${pawn.date}`}
          >
            <Pawn
              addScore={addScore}
              index={index}
              pawn={pawn.value}
              remove={popPawn}
            />
          </div>
        ) : (
          <div key={index} />
        );
      })}
    </div>
  );
}

type PawnSpawnerWrapperProps = PawnSpawnerProps & {
  gameState: GameStates;
};

export default function PawnSpawnerWrapper({
  gameState,
  ...rest
}: PawnSpawnerWrapperProps) {
  return gameState === GameStates.ON ? <PawnSpawner {...rest} /> : null;
}
