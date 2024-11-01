import React, { MutableRefObject } from "react";
import useAnimationEnd from "../hooks/useAnimationEnd";

type WithAnimationEndProps = {
  animationClass: string;
  onAnimationEnd?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationEnd<P extends WithAnimationEndProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationEndProps> & WithAnimationEndProps
  ) {
    const { animationClass, onAnimationEnd, wrapperRef, ...restProps } = props;

    const ref = useAnimationEnd<HTMLDivElement>(onAnimationEnd, wrapperRef);

    return wrapperRef ? (
      <WrappedComponent {...(restProps as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={animationClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
