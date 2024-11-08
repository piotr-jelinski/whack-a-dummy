import camelCase from "lodash.camelcase";
import { Pawns } from "../../config";
import styles from "./Pawn.module.scss";
import useAnimation from "../../hooks/useAnimation";
import { useCallback } from "react";

type PawnProps = {
  index: number;
  pawn: Pawns;
  remove: (index: number) => void;
};

export default function Pawn({ index, pawn, remove }: PawnProps) {
  const pawnClassName = camelCase(`${pawn}`);
  const removePawn = useCallback(() => remove(index), [index, remove]);
  const ref = useAnimation<HTMLButtonElement>({
    animationEventTypes: ["animationend"],
    animationNames: [styles.popUpAndDown],
    onAnimation: removePawn,
  });

  return (
    <button
      className={`${styles.pawn} ${styles[pawnClassName]}`}
      onClick={removePawn}
      ref={ref}
    ></button>
  );
}
