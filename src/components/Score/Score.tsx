import { GAME_IN_SET_UP_STATE, GameStates } from "../../config";
import styles from "./Score.module.scss";

type ScoreProps = {
  gameState: GameStates;
  score: number;
};

export default function Score({ gameState, score }: ScoreProps) {
  const animClass = GAME_IN_SET_UP_STATE.includes(gameState)
    ? styles.setup
    : styles.teardown;

  return <div className={`${styles.container} ${animClass}`}>{score}</div>;
}
