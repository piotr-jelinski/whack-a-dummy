import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimationStart from "../hocs/withAnimationStart";
import withAnimationEnd from "../hocs/withAnimationEnd";
import withAnimationTransformPreserve from "../hocs/withAnimationTransformPreserve";

const AnimatedMoveMe = withAnimationTransformPreserve(
  withAnimationStart(withAnimationEnd(MoveMe))
);
const anims = ["move-left", "move-up", "move-right", "move-down"];

function App(): JSX.Element {
  const [anim, setAnim] = useState(0);
  const onAnimationEnd = useCallback(() => {
    setAnim((a) => (a + 1) % anims.length);
  }, [setAnim]);

  return (
    <main className="flex flex-row justify-center p-64 three-d">
      <p className="absolute">*</p>
      <AnimatedMoveMe
        animationClass={`transform ${anims[anim]}`}
        onAnimationEnd={onAnimationEnd}
      />
    </main>
  );
}

export default App;
