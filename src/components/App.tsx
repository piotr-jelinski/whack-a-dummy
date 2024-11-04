import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimationStart from "../hocs/withAnimationStart";
import withAnimationEnd from "../hocs/withAnimationEnd";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import withTransitionStart from "../hocs/withTransitionStart";
import withTransitionEnd from "../hocs/withTransitionEnd";
import Cuboid from "./Cuboid/Cuboid";

const AnimatedMoveMe = withAnimationTransformPreserve(
  withAnimationStart(withAnimationEnd(MoveMe))
);
const TransitionCuboid = withTransitionStart(withTransitionEnd(Cuboid));

const anims = ["move-left", "move-up", "move-right", "move-down"];

export default function App() {
  const [anim, setAnim] = useState(0);
  const onAnimationEnd = useCallback(() => {
    setAnim((a) => (a + 1) % anims.length);
  }, [setAnim]);
  const [isOn, setIsOn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const onTransitionStart = useCallback(
    (event: TransitionEvent) => {
      console.log("onTransitionStart", event);
      setIsTransitioning(true);
    },
    [setIsTransitioning]
  );
  const onTransitionEnd = useCallback(
    (event: TransitionEvent) => {
      console.log("onTransitionEnd", event);
      setIsTransitioning(false);
    },
    [setIsTransitioning]
  );

  return (
    <main className="flex flex-row justify-center items-center w-full h-full">
      <div className="scene">
        <TransitionCuboid
          faceBack={
            <p>
              Back
              <button
                disabled={isTransitioning}
                onClick={() => setIsOn((on) => !on)}
              >
                Toggle
              </button>
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
          faceTop={<p>Top {isTransitioning ? "Transitioning" : ""}</p>}
          onTransitionStart={onTransitionStart}
          onTransitionEnd={onTransitionEnd}
          transitionClass={isOn ? "board board-on" : "board board-off"}
        />
      </div>
    </main>
  );
}
