import styles from "./Stop.module.scss";

type StopProps = {
  disabled?: boolean;
  stop: () => void;
};

export default function Stop({ disabled, stop }: StopProps) {
  return (
    <button className={styles.stop} disabled={disabled} onClick={stop}>
      End
    </button>
  );
}
