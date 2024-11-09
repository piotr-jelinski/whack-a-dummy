import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import withAnimation from "../hocs/withAnimation";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import Stop from "./Stop/Stop";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import { BoardStates, GameStates, INTERACTIVE_STATES } from "../config";
import PawnSpawner from "./Pawn/PawnSpawner";
import styles from "./App.module.scss";

const AnimatedCuboid = withAnimation(Cuboid);
const AnimatedScore = withAnimation(Score);
const AnimatedTimer = withAnimation(Timer);

const CUBOID_ANIMATION_NAMES = [styles.sceneOn, styles.sceneOff];

const STORAGE_KEY_LAST_SCORE = "lastScore";
const STORAGE_KEY_BEST_SCORE = "bestScore";

export default function App() {
  const [lastScore, setLastScore] = useLocalStorage(STORAGE_KEY_LAST_SCORE, 0);
  const [bestScore, setBestScore] = useLocalStorage(STORAGE_KEY_BEST_SCORE, 0);

  const [gameState, setGameState] = useState(GameStates.OFF);
  const [score, setScore] = useState(0);

  const play = useCallback(() => {
    setScore(0);
    setGameState(GameStates.SCENE_SETUP);
  }, [setGameState, setScore]);

  const stop = useCallback(() => {
    setGameState(GameStates.BOARD_TEARDOWN);
  }, [setGameState]);

  const addScore = useCallback(
    (points: number) => {
      setScore((s) => s + points);
    },
    [setScore]
  );

  const onBoardStatesChange = useCallback((boardState: BoardStates) => {
    if (boardState === BoardStates.SET_UP) {
      setGameState(GameStates.ON);
    }
    if (boardState === BoardStates.TORN_DOWN) {
      setGameState(GameStates.SCENE_TEARDOWN);
    }
  }, []);

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

  useEffect(() => {
    if (gameState === GameStates.OFF && score > 0) {
      setLastScore(score);
      setBestScore(Math.max(bestScore, score));
    }
  }, [bestScore, gameState, lastScore, score, setBestScore, setLastScore]);

  const innerFaceAnimClass = [GameStates.ON, GameStates.BOARD_SETUP].includes(
    gameState
  )
    ? styles.setup
    : styles.teardown;
  const cuboidAnimClass =
    (![GameStates.OFF, GameStates.SCENE_TEARDOWN].includes(gameState) &&
      styles.setup) ||
    ([GameStates.SCENE_TEARDOWN].includes(gameState) && styles.teardown) ||
    "";

  return (
    <main className={`${styles.flexCenter} ${styles.fullSize}`}>
      <div className={styles.scene}>
        <AnimatedCuboid
          animationClass={`${styles.animation} ${cuboidAnimClass}`}
          animationNames={CUBOID_ANIMATION_NAMES}
          faceBack={
            <div className={`${styles.fullSize} ${styles.board}`}>
              <PawnSpawner
                addScore={addScore}
                gameState={gameState}
                stop={stop}
              />
              <Board
                gameState={gameState}
                onStateChange={onBoardStatesChange}
              />
            </div>
          }
          faceBottom={
            <div className={`${styles.fullSize} ${styles.stop}`}>
              <Stop
                disabled={!INTERACTIVE_STATES.includes(gameState)}
                gameState={gameState}
                stop={stop}
              />
            </div>
          }
          faceFront={
            <div
              className={`${styles.flexCenter} ${styles.fullSize} ${styles.menu}`}
            >
              <button onClick={play}>Play</button>
              <div>Last score: {lastScore}</div>
              <div>Best score: {bestScore}</div>
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={
            <div className={`${styles.fullSize} ${styles.timer}`}>
              <AnimatedTimer
                animationClass={`${styles.animation} ${innerFaceAnimClass}`}
                gameState={gameState}
                stop={stop}
              />
            </div>
          }
          faceTop={
            <div className={`${styles.fullSize} ${styles.score}`}>
              <AnimatedScore
                animationClass={`${styles.animation} ${innerFaceAnimClass}`}
                score={score}
              />
            </div>
          }
          onAnimation={onCuboidAnimation}
        />
      </div>
    </main>
  );
}
