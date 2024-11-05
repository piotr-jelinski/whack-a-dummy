import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimation from "../hocs/withAnimation";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";

const AnimatedMoveMe = withAnimationTransformPreserve(withAnimation(MoveMe));

const anims = ["move-left", "move-up", "move-right", "move-down"];
const animNames = ["moveX", "moveY"];

export default function FaceFront() {
  const [anim, setAnim] = useState(0);

  const onAnimation = useCallback(
    (event: AnimationEvent) => {
      if (!["moveX", "moveY"].includes(event.animationName)) {
        return;
      }

      if (event.type === "animationend") {
        setAnim((a) => (a + 1) % anims.length);
      }
    },
    [setAnim]
  );

  return (
    <div className="absolute">
      <p className="absolute">*</p>
      <AnimatedMoveMe
        animationClass={`move ${anims[anim]}`}
        animationTransformPreserveNames={animNames}
        onAnimation={onAnimation}
      />
    </div>
  );
}
