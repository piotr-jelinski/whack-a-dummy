import { useCallback, useState } from "react";
import withAnimation from "../hocs/withAnimation";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import Stop from "./Stop/Stop";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import { BoardStates, GameStates, INTERACTIVE_STATES } from "../config";
import PawnSpawner from "./Pawn/PawnSpawner";
import styles from "./App.module.scss";

// delete this import
import FaceFront from "./Deleteme/FaceFront";

const AnimatedCuboid = withAnimation(Cuboid);
const AnimatedStop = withAnimation(Stop);
const AnimatedScore = withAnimation(Score);
const AnimatedTimer = withAnimation(Timer);

const CUBOID_ANIMATION_NAMES = [styles.sceneOn, styles.sceneOff];
const STOP_ANIMATION_NAMES = [styles.slideInY, styles.slideOutY];
const SLIDE_X_ANIMATION_NAMES = [styles.slideInX, styles.slideOutX];

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

  const onCuboidAnimation = useCallback(() => {
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
    <main className={`${styles.flexCenter} ${styles.fullSize}`}>
      <div className={styles.scene}>
        <AnimatedCuboid
          animationClass={`${styles.animation} ${
            ![GameStates.OFF, GameStates.SCENE_TEARDOWN].includes(gameState) &&
            styles.setup
          } ${
            [GameStates.SCENE_TEARDOWN].includes(gameState) && styles.teardown
          }`}
          animationEventTypes={["animationend"]}
          animationNames={CUBOID_ANIMATION_NAMES}
          faceBack={
            <div className={`${styles.fullSize} ${styles.board}`}>
              {gameState === GameStates.ON && <PawnSpawner />}
              <Board
                gameState={gameState}
                onStateChange={onBoardStatesChange}
              />
            </div>
          }
          faceBottom={
            <div className={`${styles.fullSize} ${styles.stop}`}>
              <AnimatedStop
                animationClass={`${styles.animation} ${
                  [GameStates.ON, GameStates.BOARD_SETUP].includes(gameState)
                    ? styles.setup
                    : styles.teardown
                }`}
                animationEventTypes={["animationend"]}
                animationNames={STOP_ANIMATION_NAMES}
                disabled={!isInteractive}
                stop={stop}
              />
            </div>
          }
          faceFront={
            <div className={`${styles.flexCenter} ${styles.fullSize}`}>
              <button onClick={play}>Play</button>
              <FaceFront />
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={
            <div className={`${styles.fullSize} ${styles.timer}`}>
              <AnimatedTimer
                animationClass={`${styles.animation} ${
                  [GameStates.ON, GameStates.BOARD_SETUP].includes(gameState)
                    ? styles.setup
                    : styles.teardown
                }`}
                animationEventTypes={["animationend"]}
                animationNames={SLIDE_X_ANIMATION_NAMES}
                gameState={gameState}
                stop={stop}
              />
            </div>
          }
          faceTop={
            <div className={`${styles.fullSize} ${styles.score}`}>
              <AnimatedScore
                animationClass={`${styles.animation} ${
                  [GameStates.ON, GameStates.BOARD_SETUP].includes(gameState)
                    ? styles.setup
                    : styles.teardown
                }`}
                animationEventTypes={["animationend"]}
                animationNames={SLIDE_X_ANIMATION_NAMES}
                score={0}
              />
            </div>
          }
          onAnimation={onCuboidAnimation}
        />
      </div>
    </main>
  );
}
