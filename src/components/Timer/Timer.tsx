import { useEffect, useRef, useState } from "react";
import { GAME_DURATION_S, GameStates } from "../../config";
import styles from "./Timer.module.scss";

type TimerProps = {
  gameState: GameStates;
  stop: () => void;
};

export default function Timer({ gameState, stop }: TimerProps) {
  const [time, setTime] = useState(0);
  const startTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (gameState === GameStates.BOARD_SETUP) {
      startTimeRef.current = Date.now();
      setTime(GAME_DURATION_S);
    }
  }, [gameState, setTime]);

  useEffect(() => {
    if (gameState === GameStates.ON) {
      intervalRef.current = setInterval(() => {
        setTime(() => {
          const timeLeft =
            GAME_DURATION_S -
            Math.floor((Date.now() - startTimeRef.current) / 1000);
          if (timeLeft <= 0) {
            stop();
            clearInterval(intervalRef.current);

            return 0;
          }

          return timeLeft;
        });
      }, 250);
    }

    if (gameState === GameStates.BOARD_TEARDOWN) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [gameState, setTime, stop]);

  return <div className={`${styles.timer}`}>{`${time}`.padStart(2, "0")}</div>;
}
