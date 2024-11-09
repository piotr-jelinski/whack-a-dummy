import styles from "./Menu.module.scss";

type MenuProps = {
  bestScore: number;
  lastScore: number;
  play: () => void;
};

export default function Menu({ bestScore, lastScore, play }: MenuProps) {
  return (
    <div className={`${styles.container}`}>
      <button onClick={play}>Play</button>
      <div>Last score: {lastScore}</div>
      <div>Best score: {bestScore}</div>
    </div>
  );
}
