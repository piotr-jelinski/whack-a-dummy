import { GameStates, GAME_ELEMENTS_VISIBLE_STATES } from "../../config";
import Hole from "./Hole";
import withAnimation from "../../hocs/withAnimation";

const AnimatedHole = withAnimation(Hole);

type BoardProps = {
  gameState: GameStates;
};

export default function Board({ gameState }: BoardProps) {
  const showHoles = GAME_ELEMENTS_VISIBLE_STATES.includes(gameState);
  const animationClass =
    (gameState === GameStates.BOARD_SETUP && "hole-setup") ||
    (gameState === GameStates.BOARD_TEARDOWN && "hole-teardown") ||
    "";

  return (
    <div className="board">
      {showHoles &&
        Array.from({ length: 25 }).map((_, index) => {
          return (
            <AnimatedHole
              animationClass={`hole-animation ${animationClass}`}
              animationEventTypes={["animationend"]}
              animationNames={["hole-setup", "hole-teardown"]}
              index={index}
              key={index}
            />
          );
        })}
    </div>
  );
}
