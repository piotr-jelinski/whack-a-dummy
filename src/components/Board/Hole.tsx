import styles from "./Hole.module.scss";

type HoleProps = {
  isActive: boolean;
};

export default function Hole({ isActive }: HoleProps) {
  return (
    <div
      className={`${styles.hole} ${isActive ? styles.active : styles.inactive}`}
    />
  );
}
