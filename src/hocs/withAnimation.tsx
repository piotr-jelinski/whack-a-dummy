import React from "react";
import useAnimationEnd from "../hooks/useAnimationEnd";

type WithAnimationProps = {
  animationClass: string;
  onAnimationEnd?: (event: AnimationEvent) => void;
};

export default function withAnimation<P extends WithAnimationProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationProps> & WithAnimationProps
  ) {
    const { animationClass, onAnimationEnd, ...restProps } = props;

    const ref = useAnimationEnd<HTMLDivElement>(onAnimationEnd);

    return (
      <div ref={ref} className={animationClass}>
        <WrappedComponent {...(restProps as P)} />
      </div>
    );
  };
}
