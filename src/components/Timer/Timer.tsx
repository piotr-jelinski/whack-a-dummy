import { useEffect, useState } from "react";
import { GAME_DURATION, GameStates } from "../../config";
import styles from "./Timer.module.scss";

type TimerProps = {
  gameState: GameStates;
  stop: () => void;
};

export default function Timer({ gameState, stop }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameState === GameStates.BOARD_SETUP) {
      setTime(GAME_DURATION);
    }
  }, [gameState, setTime]);

  useEffect(() => {
    if (gameState === GameStates.ON) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            stop();
            clearInterval(interval);

            return 0;
          }

          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState, setTime, stop]);

  return <div className={`${styles.timer}`}>{`${time}`.padStart(2, "0")}</div>;
}
