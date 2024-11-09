import {
  GAME_IN_SET_UP_STATE,
  GameStates,
  INTERACTIVE_STATES,
} from "../../config";
import styles from "./Stop.module.scss";

type StopProps = {
  gameState: GameStates;
  stop: () => void;
};

export default function Stop({ gameState, stop }: StopProps) {
  const animClass = GAME_IN_SET_UP_STATE.includes(gameState)
    ? styles.setup
    : styles.teardown;
  const disabled = !INTERACTIVE_STATES.includes(gameState);

  return (
    <button
      className={`${styles.container} ${animClass}`}
      disabled={disabled}
      onClick={stop}
    >
      Exit
    </button>
  );
}
