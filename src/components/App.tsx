import { useCallback, useState } from "react";
import withAnimation from "../hocs/withAnimation";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";
import FaceFront from "./FaceFront";

const TransitionCuboid = withAnimationTransformPreserve(withAnimation(Cuboid));

// const anims = ["board-on", "board-off"];
const animNames = ["boardOn", "boardOff"];

export default function App() {
  const [isOn, setIsOn] = useState(false);
  const [isAnimatingCuboid, setIsAnimatingCuboid] = useState(false);
  const [isAnimationPreservedCuboid, setIsAnimationPreservedCuboid] =
    useState(true);

  const toggleDisabled = isAnimatingCuboid || !isAnimationPreservedCuboid;
  const toggle = useCallback(() => {
    setIsOn((on) => !on);
  }, [setIsOn]);

  const onCuboidAnimation = useCallback(
    (event: AnimationEvent) => {
      if (event.type === "animationstart") {
        //console.log("onCuboidAnimation :: animationstart", event);
        setIsAnimatingCuboid(true);
        setIsAnimationPreservedCuboid(false);
      }

      if (event.type === "animationend") {
        //console.log("onCuboidAnimation :: animationend", event);
        setIsAnimatingCuboid(false);
      }
    },
    [setIsAnimatingCuboid]
  );
  const onCuboidAnimationTransformPreserve = useCallback(
    (event: AnimationEvent) => {
      if (event.type === "animationend") {
        setIsAnimationPreservedCuboid(true);
      }
    },
    [setIsAnimationPreservedCuboid]
  );

  return (
    <main className="flex flex-row justify-center items-center w-full h-full">
      <div className="scene">
        <TransitionCuboid
          animationClass={`board ${isOn ? "board-on" : "board-off"}`}
          animationTransformPreserveNames={animNames}
          animationNames={animNames}
          faceBack={
            <p>
              Back
              <button disabled={toggleDisabled} onClick={toggle}>
                Toggle
              </button>
            </p>
          }
          faceBottom={<p>Bottom</p>}
          faceFront={
            <div className="flex justify-center items-center w-full h-full">
              {toggleDisabled ? "Animating" : ""}
              <button onClick={toggle}>Toggle</button>
              <FaceFront />
            </div>
          }
          faceLeft={<p>Left</p>}
          faceRight={<p>Right</p>}
          faceTop={<p>Top {toggleDisabled ? "Animating" : ""}</p>}
          onAnimation={onCuboidAnimation}
          onAnimationTransformPreserve={onCuboidAnimationTransformPreserve}
        />
      </div>
    </main>
  );
}
