import { useCallback, useRef } from "react";
import { GameStates, BoardStates, HOLE_COUNT, holeArray } from "../../config";
import Hole from "./Hole";
import withAnimation from "../../hocs/withAnimation";
import styles from "./Board.module.scss";

const AnimatedHole = withAnimation(Hole);

type BoardProps = {
  gameState: GameStates;
  onStateChange: (state: BoardStates) => void;
};

const HOLE_ANIMATION_NAMES = [styles.grow, styles.shrink];
const SHOW_HOLES_STATES = [
  GameStates.BOARD_SETUP,
  GameStates.BOARD_TEARDOWN,
  GameStates.ON,
];

export default function Board({ gameState, onStateChange }: BoardProps) {
  const numberOfSetUpHolesRef = useRef(0);
  const showHoles = SHOW_HOLES_STATES.includes(gameState);

  const onHoleAnimation = useCallback(
    (event: AnimationEvent) => {
      const { animationName } = event;
      if (animationName === styles.grow) {
        numberOfSetUpHolesRef.current += 1;
      }
      if (animationName === styles.shrink) {
        numberOfSetUpHolesRef.current -= 1;
      }

      if (numberOfSetUpHolesRef.current === HOLE_COUNT) {
        onStateChange(BoardStates.SET_UP);
      }
      if (numberOfSetUpHolesRef.current === 0) {
        onStateChange(BoardStates.TORN_DOWN);
      }
    },
    [onStateChange]
  );
  const holeAnimClass =
    (gameState === GameStates.BOARD_SETUP && styles.setup) ||
    (gameState === GameStates.BOARD_TEARDOWN && styles.teardown) ||
    "";

  return showHoles ? (
    <div className={styles.board}>
      {holeArray.map((isActive, index) => {
        return (
          <AnimatedHole
            animationClass={`${styles.animation} ${holeAnimClass}`}
            animationNames={HOLE_ANIMATION_NAMES}
            isActive={isActive}
            key={index}
            onAnimation={onHoleAnimation}
          />
        );
      })}
    </div>
  ) : null;
}
