import camelCase from "lodash.camelcase";
import { Pawns } from "../../config";
import styles from "./Pawn.module.scss";
import useAnimation from "../../hooks/useAnimation";

type PawnProps = {
  pawn: Pawns;
};

export default function Pawn({ pawn }: PawnProps) {
  const pawnClassName = camelCase(`${pawn}`);
  const onAnimation = (event: AnimationEvent) => {
    console.log("Pawn :: onAnimation", event);
  };
  const ref = useAnimation<HTMLButtonElement>({
    animationEventTypes: ["animationend"],
    animationNames: [styles.popUpAndDown],
    onAnimation,
  });

  return (
    <button
      className={`${styles.pawn} ${styles[pawnClassName]}`}
      ref={ref}
    ></button>
  );
}
