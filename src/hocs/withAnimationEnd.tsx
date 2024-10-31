import React, { MutableRefObject, useCallback } from "react";
import useAnimationEnd from "../hooks/useAnimationEnd";

type WithAnimationEndProps = {
  animationClass: string;
  onAnimation?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationEnd<P extends WithAnimationEndProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationEndProps> & WithAnimationEndProps
  ) {
    const { animationClass, onAnimation, wrapperRef, ...restProps } = props;

    const onAnimationEnd = useCallback(
      (event: AnimationEvent) => {
        if (event.type !== "animationend") {
          return;
        }

        const { animationName, currentTarget, type } = event;
        const element = currentTarget as HTMLElement;
        //const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const transform = computedStyle.getPropertyValue("transform");
        console.log(animationName, type, transform);
        onAnimation?.(event);
      },
      [onAnimation]
    );
    const ref = useAnimationEnd<HTMLDivElement>(onAnimationEnd, wrapperRef);

    return wrapperRef ? (
      <WrappedComponent
        {...(restProps as P)}
        onAnimation={onAnimation}
        wrapperRef={wrapperRef}
      />
    ) : (
      <div ref={ref} className={animationClass}>
        <WrappedComponent
          {...(restProps as P)}
          onAnimation={onAnimation}
          wrapperRef={ref}
        />
      </div>
    );
  };
}
