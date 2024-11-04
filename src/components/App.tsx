import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimation from "../hocs/withAnimation";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";

const AnimatedMoveMe = withAnimationTransformPreserve(withAnimation(MoveMe));
const TransitionCuboid = withAnimationTransformPreserve(withAnimation(Cuboid));

const anims = ["move-left", "move-up", "move-right", "move-down"];

export default function App() {
  const [anim, setAnim] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggle = useCallback(() => setIsOn((on) => !on), [setIsOn]);

  const onAnimation = useCallback(
    (event: AnimationEvent) => {
      if (!["moveX", "moveY"].includes(event.animationName)) {
        return;
      }

      if (event.type === "animationend") {
        //console.log("onAnimation :: animationend", event);
        setAnim((a) => (a + 1) % anims.length);
      }
    },
    [setAnim]
  );

  const onCuboidAnimation = useCallback(
    (event: AnimationEvent) => {
      if (!["boardOn", "boardOff"].includes(event.animationName)) {
        return;
      }

      if (event.type === "animationstart") {
        //console.log("onCuboidAnimation :: animationstart", event);
        setIsTransitioning(true);
      }
      if (event.type === "animationend") {
        //console.log("onCuboidAnimation :: animationend", event);
        setIsTransitioning(false);
      }
    },
    [setIsTransitioning]
  );

  return (
    <main className="flex flex-row justify-center items-center w-full h-full">
      <div className="scene">
        <TransitionCuboid
          animationClass={`board ${isOn ? "board-on" : "board-off"}`}
          faceBack={
            <p>
              Back
              <button disabled={isTransitioning} onClick={toggle}>
                Toggle
              </button>
            </p>
          }
          faceBottom={<p>Bottom</p>}
          faceFront={
            <div className="flex justify-center items-center w-full h-full">
              <button onClick={toggle}>Toggle</button>
              <p className="absolute">*</p>
              <AnimatedMoveMe
                animationClass={`move ${anims[anim]}`}
                onAnimation={onAnimation}
              />
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={<p>Right</p>}
          faceTop={<p>Top {isTransitioning ? "Transitioning" : ""}</p>}
          onAnimation={onCuboidAnimation}
        />
      </div>
    </main>
  );
}
