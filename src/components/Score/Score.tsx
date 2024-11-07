import styles from "./Score.module.scss";

type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return <div className={`${styles.score}`}>{score}</div>;
}
