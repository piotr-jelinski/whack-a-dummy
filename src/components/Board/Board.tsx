import { useCallback, useRef } from "react";
import {
  GameStates,
  GAME_ELEMENTS_VISIBLE_STATES,
  BoardStates,
  HOLE_COUNT,
} from "../../config";
import Hole from "./Hole";
import withAnimation from "../../hocs/withAnimation";
import styles from "./Board.module.scss";

const AnimatedHole = withAnimation(Hole);

type BoardProps = {
  gameState: GameStates;
  onStateChange: (state: BoardStates) => void;
};

const HOLE_ANIMATION_NAMES = [styles.grow, styles.shrink];

export default function Board({ gameState, onStateChange }: BoardProps) {
  const holesSetUpRef = useRef(0);
  const showHoles = GAME_ELEMENTS_VISIBLE_STATES.includes(gameState);

  const onHoleAnimation = useCallback(
    (event: AnimationEvent) => {
      const { animationName } = event;
      if (animationName === styles.grow) {
        holesSetUpRef.current += 1;
      }
      if (animationName === styles.shrink) {
        holesSetUpRef.current -= 1;
      }

      if (holesSetUpRef.current === HOLE_COUNT) {
        onStateChange(BoardStates.SET_UP);
      }
      if (holesSetUpRef.current === 0) {
        onStateChange(BoardStates.TORN_DOWN);
      }
    },
    [onStateChange]
  );

  return showHoles ? (
    <div className={styles.board}>
      {Array.from({ length: HOLE_COUNT }).map((_, index) => {
        return (
          <AnimatedHole
            animationClass={`${styles.animation} ${
              gameState === GameStates.BOARD_SETUP && styles.setup
            } ${gameState === GameStates.BOARD_TEARDOWN && styles.teardown}`}
            animationEventTypes={["animationend"]}
            animationNames={HOLE_ANIMATION_NAMES}
            index={index}
            key={index}
            onAnimation={onHoleAnimation}
          />
        );
      })}
    </div>
  ) : null;
}
