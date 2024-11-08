import camelCase from "lodash.camelcase";
import { Pawns } from "../../config";
import styles from "./Pawn.module.scss";

type PawnProps = {
  pawn: Pawns;
};

export default function Pawn({ pawn }: PawnProps) {
  const pawnClassName = camelCase(`${pawn}`);

  return (
    <button className={`${styles.pawn} ${styles[pawnClassName]}`}></button>
  );
}
