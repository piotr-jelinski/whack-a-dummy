import { useCallback, useState } from "react";
import MoveMe from "./MoveMe";
import withAnimation from "../hocs/withAnimation";

const AnimatedMoveMe = withAnimation(MoveMe);
const anims = ["move-left", "move-up", "move-right", "move-down"];

function App(): JSX.Element {
  const [anim, setAnim] = useState(0);
  const onAnimationEnd = useCallback(
    (event: AnimationEvent) => {
      setAnim((a) => (a + 1) % anims.length);
    },
    [setAnim]
  );

  return (
    <main className="flex flex-row justify-center p-64">
      <p>TODO</p>
      <AnimatedMoveMe
        animationClass={anims[anim]}
        onAnimationEnd={onAnimationEnd}
      />
    </main>
  );
}

export default App;
