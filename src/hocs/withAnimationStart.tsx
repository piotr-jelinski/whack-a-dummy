import React, { MutableRefObject, useCallback } from "react";
import useAnimationStart from "../hooks/useAnimationStart";

type WithAnimationStartProps = {
  animationClass: string;
  onAnimation?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationStart<P extends WithAnimationStartProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationStartProps> & WithAnimationStartProps
  ) {
    const { animationClass, onAnimation, wrapperRef, ...restProps } = props;

    const onAnimationStart = useCallback(
      (event: AnimationEvent) => {
        if (event.type !== "animationstart") {
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
    const ref = useAnimationStart<HTMLDivElement>(onAnimationStart, wrapperRef);

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
