import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimationStart from "../hocs/withAnimationStart";
import withAnimationEnd from "../hocs/withAnimationEnd";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";

const AnimatedMoveMe = withAnimationTransformPreserve(
  withAnimationStart(withAnimationEnd(MoveMe))
);
const anims = ["move-left", "move-up", "move-right", "move-down"];

export default function App() {
  const [anim, setAnim] = useState(0);
  const onAnimationEnd = useCallback(() => {
    setAnim((a) => (a + 1) % anims.length);
  }, [setAnim]);
  const [isOn, setIsOn] = useState(false);

  return (
    <main className="flex flex-row justify-center items-center w-full h-full">
      <div className="scene">
        <Cuboid
          className={isOn ? "board-on" : "board-off"}
          faceBack={
            <p>
              Back
              <button onClick={() => setIsOn((on) => !on)}>Toggle</button>
            </p>
          }
          faceBottom={<p>Bottom</p>}
          faceFront={
            <div className="flex justify-center items-center w-full h-full">
              <button onClick={() => setIsOn((on) => !on)}>Toggle</button>
              <p className="absolute">*</p>
              <AnimatedMoveMe
                animationClass={`transform ${anims[anim]}`}
                onAnimationEnd={onAnimationEnd}
              />
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={<p>Right</p>}
          faceTop={<p>Top</p>}
        />
      </div>
    </main>
  );
}
