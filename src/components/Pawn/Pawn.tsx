import camelCase from "lodash.camelcase";
import { Pawns } from "../../config";
import styles from "./Pawn.module.scss";
import useAnimation from "../../hooks/useAnimation";

type PawnProps = {
  pawn: Pawns;
  remove: () => void;
};

export default function Pawn({ pawn, remove }: PawnProps) {
  const pawnClassName = camelCase(`${pawn}`);
  const ref = useAnimation<HTMLButtonElement>({
    animationEventTypes: ["animationend"],
    animationNames: [styles.popUpAndDown],
    onAnimation: remove,
  });

  return (
    <button
      className={`${styles.pawn} ${styles[pawnClassName]}`}
      onClick={remove}
      ref={ref}
    ></button>
  );
}
