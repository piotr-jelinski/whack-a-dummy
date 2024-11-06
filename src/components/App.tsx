import { useCallback, useState } from "react";
import withAnimation from "../hocs/withAnimation";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import Stop from "./Stop/Stop";
import FaceFront from "./FaceFront";
import { BoardStates, GameStates, INTERACTIVE_STATES } from "../config";

const AnimatedCuboid = withAnimationTransformPreserve(Cuboid);
const AnimatedStop = withAnimation(Stop);

const CUBOID_ANIMATION_NAMES = ["sceneOn", "sceneOff"];
const STOP_ANIMATION_NAMES = ["slideIn", "slideOut"];

// on Play click:
// 1. rotate the Game
// 2. show the board (holes should grow into view), slide the Exit button into position, display timer, display points
// 3. start the Game and timer (dummies should start appearing on the board)

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
  const isInteractive = INTERACTIVE_STATES.includes(gameState);

  console.log("gameState", gameState, isInteractive);

  const play = useCallback(() => {
    setGameState(GameStates.SCENE_SETUP);
  }, [setGameState]);

  const onBoardStatesChange = useCallback((boardState: BoardStates) => {
    if (boardState === BoardStates.SET_UP) {
      setGameState(GameStates.ON);
    }
    if (boardState === BoardStates.TORN_DOWN) {
      setGameState(GameStates.SCENE_TEARDOWN);
    }
  }, []);

  const stop = useCallback(() => {
    setGameState(GameStates.BOARD_TEARDOWN);
  }, [setGameState]);

  const onCuboidAnimationTransformPreserve = useCallback(() => {
    setGameState((gState) => {
      if (gState === GameStates.SCENE_SETUP) {
        return GameStates.BOARD_SETUP;
      }
      if (gState === GameStates.SCENE_TEARDOWN) {
        return GameStates.OFF;
      }

      return gState;
    });
  }, [setGameState]);

  return (
    <main className="flex justify-center items-center w-full h-full">
      <div className="scene">
        <AnimatedCuboid
          animationClass={`scene-animation ${
            [GameStates.OFF, GameStates.SCENE_TEARDOWN].includes(gameState)
              ? "scene-off"
              : "scene-on"
          }`}
          animationTransformPreserveEventTypes={["animationend"]}
          animationTransformPreserveNames={CUBOID_ANIMATION_NAMES}
          faceBack={
            <>
              <Board
                gameState={gameState}
                onStateChange={onBoardStatesChange}
              />
            </>
          }
          faceBottom={
            <AnimatedStop
              animationClass={`stop-animation ${
                [GameStates.ON, GameStates.BOARD_SETUP].includes(gameState)
                  ? "stop-setup"
                  : "stop-teardown"
              }`}
              animationEventTypes={["animationend"]}
              animationNames={STOP_ANIMATION_NAMES}
              disabled={!isInteractive}
              stop={stop}
            />
          }
          faceFront={
            <div className="flex justify-center items-center w-full h-full">
              <button onClick={play}>Play</button>
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
