import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimation from "../../hocs/withAnimation";
import withAnimationTransformPreserve from "../../hocs/withAnimationTransformPreserve";
import styles from "./FaceFront.module.scss";

const AnimatedMoveMe = withAnimationTransformPreserve(withAnimation(MoveMe));

const anims = [styles.left, styles.up, styles.right, styles.down];
const animNames = [styles.moveX, styles.moveY];

export default function FaceFront() {
  const [anim, setAnim] = useState(0);

  const onAnimation = useCallback(() => {
    setAnim((a) => (a + 1) % anims.length);
  }, [setAnim]);

  return (
    <div className={styles.absolute}>
      <p className={styles.absolute}>*</p>
      <AnimatedMoveMe
        animationClass={`${styles.move} ${anims[anim]}`}
        animationTransformPreserveNames={animNames}
        animationEventTypes={["animationend"]}
        onAnimation={onAnimation}
      />
    </div>
  );
}
