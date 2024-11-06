import React from "react";
import styles from "./Cuboid.module.scss";

type CuboidProps = {
  faceBack?: React.ReactNode;
  faceBottom?: React.ReactNode;
  faceFront?: React.ReactNode;
  faceLeft?: React.ReactNode;
  faceRight?: React.ReactNode;
  faceTop?: React.ReactNode;
};

const Cuboid: React.FunctionComponent<CuboidProps> = ({
  faceBack = null,
  faceBottom = null,
  faceFront = null,
  faceLeft = null,
  faceRight = null,
  faceTop = null,
}) => {
  return (
    <div className={styles.cuboid}>
      <div className={`${styles.face} ${styles.back}`}>{faceBack}</div>
      <div className={`${styles.face} ${styles.bottom}`}>{faceBottom}</div>
      <div className={`${styles.face} ${styles.front}`}>{faceFront}</div>
      <div className={`${styles.face} ${styles.left}`}>{faceLeft}</div>
      <div className={`${styles.face} ${styles.right}`}>{faceRight}</div>
      <div className={`${styles.face} ${styles.top}`}>{faceTop}</div>
    </div>
  );
};

export default Cuboid;
