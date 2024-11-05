import React, { MutableRefObject } from "react";
import useAnimation, {
  DEFAULT_ANIMATION_EVENT_TYPES,
} from "../hooks/useAnimation";
import type { AnimationEventType } from "../types";

type WithAnimationProps = {
  animationClass?: string;
  animationEventTypes?: AnimationEventType[];
  animationNames?: string[];
  onAnimation?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationStart<P extends {}>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationProps> & WithAnimationProps
  ) {
    const {
      animationClass,
      animationEventTypes = DEFAULT_ANIMATION_EVENT_TYPES,
      animationNames,
      onAnimation,
      wrapperRef,
      ...restProps
    } = props;

    const ref = useAnimation<HTMLDivElement>({
      animationEventTypes,
      animationNames,
      externalRef: wrapperRef,
      onAnimation,
    });

    return wrapperRef ? (
      <WrappedComponent {...(props as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={animationClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
