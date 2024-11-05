import { useCallback, useRef } from "react";
import {
  GameStates,
  GAME_ELEMENTS_VISIBLE_STATES,
  BoardStates,
} from "../../config";
import Hole from "./Hole";
import withAnimation from "../../hocs/withAnimation";

const AnimatedHole = withAnimation(Hole);

type BoardProps = {
  gameState: GameStates;
  onStateChange: (state: BoardStates) => void;
};

const HOLE_COUNT = 25;
const HOLE_ANIMATION_NAMES = ["grow", "shrink"];

export default function Board({ gameState, onStateChange }: BoardProps) {
  const holesSetUpRef = useRef(0);
  const showHoles = GAME_ELEMENTS_VISIBLE_STATES.includes(gameState);
  const animationClass =
    (gameState === GameStates.BOARD_SETUP && "hole-setup") ||
    (gameState === GameStates.BOARD_TEARDOWN && "hole-teardown") ||
    "";

  const onHoleAnimation = useCallback(
    (event: AnimationEvent) => {
      const { animationName } = event;
      if (animationName === "grow") {
        holesSetUpRef.current += 1;
      }
      if (animationName === "shrink") {
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

  return (
    <div className="board">
      {showHoles &&
        Array.from({ length: HOLE_COUNT }).map((_, index) => {
          return (
            <AnimatedHole
              animationClass={`hole-animation ${animationClass}`}
              animationEventTypes={["animationend"]}
              animationNames={HOLE_ANIMATION_NAMES}
              index={index}
              key={index}
              onAnimation={onHoleAnimation}
            />
          );
        })}
    </div>
  );
}
