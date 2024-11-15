import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import withAnimation from "../hocs/withAnimation";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import Stop from "./Stop/Stop";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import Menu from "./Menu/Menu";
import { BoardStates, GameStates } from "../config";
import PawnSpawner from "./Pawn/PawnSpawner";
import { playEnd, playStart } from "../utils";
import styles from "./App.module.scss";

const AnimatedCuboid = withAnimation(Cuboid);

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
    playStart();
  }, [setGameState, setScore]);

  const stop = useCallback(() => {
    setGameState(GameStates.BOARD_TEARDOWN);
    playEnd();
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

  const cuboidAnimClass =
    (GameStates.SCENE_TEARDOWN === gameState && styles.teardown) ||
    (GameStates.OFF !== gameState && styles.setup) ||
    "";

  return (
    <main className={`${styles.container}`}>
      <div className={styles.scene}>
        <AnimatedCuboid
          animationClass={`${styles.animation} ${cuboidAnimClass}`}
          animationNames={CUBOID_ANIMATION_NAMES}
          faceBack={
            <div className={`${styles.board}`}>
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
          faceBottom={<Stop gameState={gameState} stop={stop} />}
          faceFront={
            <Menu bestScore={bestScore} lastScore={lastScore} play={play} />
          }
          faceRight={
            <div className={`${styles.timer}`}>
              <Timer gameState={gameState} stop={stop} />
            </div>
          }
          faceTop={
            <div className={`${styles.score}`}>
              <Score gameState={gameState} score={score} />
            </div>
          }
          onAnimation={onCuboidAnimation}
        />
      </div>
    </main>
  );
}
