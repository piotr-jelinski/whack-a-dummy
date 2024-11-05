import { useCallback, useState } from "react";
import withAnimation from "../hocs/withAnimation";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";
import Cuboid from "./Cuboid/Cuboid";
import Board from "./Board/Board";
import FaceFront from "./FaceFront";

const TransitionCuboid = withAnimationTransformPreserve(withAnimation(Cuboid));

const animNames = ["gameOn", "gameOff"];

// on Play click:
// 1. rotate the game
// 2. show the board (holes should grow into view), slide the Exit button into position, display timer, display points
// 3. countdown from 3 to 1 on screen
// 4. start the game and timer (dummies should start appearing on the board)

// on Exit click:
// 1. stop the game and timer (unload all dummies, count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the game back to the original position

// on Timer end:
// 1. stop the game (unload all dummies, count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the game back to the original position

// on Last dummy removed:
// 1. stop the game and timer (count points)
// 2. slide the Exit button out of view, hide the timer and points, hide the board (holes should shrink out of view)
// 3. rotate the game back to the original position

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
        setIsAnimatingCuboid(true);
        setIsAnimationPreservedCuboid(false);
      }

      if (event.type === "animationend") {
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
          animationClass={`game ${isOn ? "game-on" : "game-off"}`}
          animationTransformPreserveNames={animNames}
          animationNames={animNames}
          faceBack={
            <>
              <p className="absolute z-10">
                Back
                <button disabled={toggleDisabled} onClick={toggle}>
                  Toggle
                </button>
              </p>
              <Board />
            </>
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
