import React, { MutableRefObject } from "react";
import useAnimationTransformPreserve, {
  DEFAULT_ANIMATION_EVENT_TYPES,
} from "../hooks/useAnimationTransformPreserve";
import type { AnimationEventType } from "../hooks/useAnimationTransformPreserve";

type WithAnimationTransformPreserveProps = {
  animationClass?: string;
  eventTypes?: AnimationEventType[];
  onAnimationTransformPreserve?: (event: AnimationEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withAnimationTransformPreserve<P extends {}>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithAnimationTransformPreserveProps> &
      WithAnimationTransformPreserveProps
  ) {
    const {
      animationClass,
      eventTypes = DEFAULT_ANIMATION_EVENT_TYPES,
      onAnimationTransformPreserve,
      wrapperRef,
      ...restProps
    } = props;

    const ref = useAnimationTransformPreserve<HTMLDivElement>(
      onAnimationTransformPreserve,
      eventTypes,
      wrapperRef
    );

    return wrapperRef ? (
      <WrappedComponent {...(restProps as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={animationClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
