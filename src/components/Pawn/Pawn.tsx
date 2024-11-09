import { useCallback } from "react";
import camelCase from "lodash.camelcase";
import { pawnMap, Pawns } from "../../config";
import useAnimation from "../../hooks/useAnimation";
import { playWhack } from "../../utils";
import styles from "./Pawn.module.scss";

type PawnProps = {
  addScore: (points: number) => void;
  index: number;
  pawn: Pawns;
  remove: (index: number) => void;
};

export default function Pawn({ addScore, index, pawn, remove }: PawnProps) {
  const pawnClassName = camelCase(`${pawn}`);

  const removePawn = useCallback(() => remove(index), [index, remove]);
  const onClick = useCallback(() => {
    playWhack();
    addScore(pawnMap.get(pawn)!.points);
    removePawn();
  }, [addScore, pawn, removePawn]);

  const ref = useAnimation<HTMLButtonElement>({
    animationNames: [styles.popUpAndDown],
    onAnimation: removePawn,
  });

  return (
    <button
      className={`${styles.pawn} ${styles[pawnClassName]}`}
      onClick={onClick}
      ref={ref}
    ></button>
  );
}
