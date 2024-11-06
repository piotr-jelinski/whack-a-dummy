import styles from "./Hole.module.scss";

type HoleProps = {
  index: number;
};

export default function Hole({ index }: HoleProps) {
  return (
    <div
      className={`${styles.hole} ${
        (index + 1) % 2 === 1 ? styles.active : styles.inactive
      }`}
    />
  );
}
