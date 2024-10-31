import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimationStart from "../hocs/withAnimationStart";
import withAnimationEnd from "../hocs/withAnimationEnd";

const AnimatedMoveMe = withAnimationStart(withAnimationEnd(MoveMe));
const anims = ["move-left", "move-up", "move-right", "move-down"];

function App(): JSX.Element {
  const [anim, setAnim] = useState(0);
  const onAnimation = useCallback(
    (event: AnimationEvent) => {
      if (event.type === "animationend") {
        setAnim((a) => (a + 1) % anims.length);
      }
    },
    [setAnim]
  );

  return (
    <main className="flex flex-row justify-center p-64">
      <p>*</p>
      <AnimatedMoveMe animationClass={anims[anim]} onAnimation={onAnimation} />
    </main>
  );
}

export default App;
