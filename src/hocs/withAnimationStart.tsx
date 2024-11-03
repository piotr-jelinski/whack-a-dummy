import React, { MutableRefObject } from "react";
import useAnimationStart from "../hooks/useAnimationStart";

type WithAnimationStartProps = {
  animationClass?: string;
  onAnimationStart?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationStart<P extends {}>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationStartProps> & WithAnimationStartProps
  ) {
    const { animationClass, onAnimationStart, wrapperRef, ...restProps } =
      props;

    const ref = useAnimationStart<HTMLDivElement>(onAnimationStart, wrapperRef);

    return wrapperRef ? (
      <WrappedComponent {...(restProps as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={animationClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
