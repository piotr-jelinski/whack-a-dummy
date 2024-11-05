import React, { MutableRefObject } from "react";
import useAnimationTransformPreserve, {
  DEFAULT_ANIMATION_TRANSFORM_EVENT_TYPES,
} from "../hooks/useAnimationTransformPreserve";
import type { AnimationEventType } from "../types";

type WithAnimationTransformPreserveProps = {
  animationClass?: string;
  animationTransformPreserveEventTypes?: AnimationEventType[];
  animationTransformPreserveNames?: string[];
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
      animationTransformPreserveEventTypes = DEFAULT_ANIMATION_TRANSFORM_EVENT_TYPES,
      animationTransformPreserveNames,
      onAnimationTransformPreserve,
      wrapperRef,
      ...restProps
    } = props;

    const ref = useAnimationTransformPreserve<HTMLDivElement>({
      animationTransformPreserveEventTypes,
      animationTransformPreserveNames,
      externalRef: wrapperRef,
      onAnimationTransformPreserve,
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
