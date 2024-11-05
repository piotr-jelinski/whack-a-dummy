import { useCallback, useState } from "react";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import FaceFront from "./FaceFront";
import { GameStates, INTERACTIVE_STATES } from "../config";

const TransitionCuboid = withAnimationTransformPreserve(Cuboid);

const animNames = ["sceneOn", "sceneOff"];

// on Play click:
// 1. rotate the Game
// 2. show the board (holes should grow into view), slide the Exit button into position, display timer, display points
// 3. countdown from 3 to 1 on screen
// 4. start the Game and timer (dummies should start appearing on the board)

// on Exit click:
// 1. stop the Game and timer (unload all dummies, count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the Game back to the original position

// on Timer end:
// 1. stop the Game (unload all dummies, count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the Game back to the original position

// on Last dummy removed:
// 1. stop the Game and timer (count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the Game back to the original position

export default function App() {
  const [gameState, setGameState] = useState(GameStates.OFF);
  console.log("gameState", gameState);

  const toggleDisabled = !INTERACTIVE_STATES.includes(gameState);
  const toggle = useCallback(() => {
    setGameState((state) => {
      if (state === GameStates.OFF) {
        return GameStates.SCENE_SETUP;
      }
      if (state === GameStates.ON) {
        return GameStates.SCENE_TEARDOWN;
      }

      return state;
    });
  }, [setGameState]);

  const onCuboidAnimationTransformPreserve = useCallback(() => {
    setGameState((state) => {
      if (state === GameStates.SCENE_SETUP) {
        return GameStates.BOARD_SETUP;
      }
      if (state === GameStates.SCENE_TEARDOWN) {
        return GameStates.BOARD_TEARDOWN;
      }

      return state;
    });
  }, [setGameState]);

  return (
    <main className="flex flex-row justify-center items-center w-full h-full">
      <div className="scene-container">
        <TransitionCuboid
          animationClass={`scene ${
            gameState === GameStates.OFF ? "scene-off" : "scene-on"
          }`}
          animationTransformPreserveEventTypes={["animationend"]}
          animationTransformPreserveNames={animNames}
          faceBack={
            <>
              <p className="absolute z-10">
                Back
                <button disabled={toggleDisabled} onClick={toggle}>
                  Toggle
                </button>
              </p>
              <Board gameState={gameState} />
            </>
          }
          faceBottom={<p>Bottom</p>}
          faceFront={
            <div className="flex justify-center items-center w-full h-full">
              <button onClick={toggle}>Toggle</button>
              <FaceFront />
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={<p>Right</p>}
          faceTop={<p>Top</p>}
          onAnimationTransformPreserve={onCuboidAnimationTransformPreserve}
        />
      </div>
    </main>
  );
}
