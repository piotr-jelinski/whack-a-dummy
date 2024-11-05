import { MutableRefObject, useEffect, useRef } from "react";
import type { AnimationEventType } from "../types";

type AnimationProps<T> = {
  animationEventTypes: AnimationEventType[];
  animationNames?: string[];
  externalRef?: MutableRefObject<T | null>;
  onAnimation?: (event: AnimationEvent) => void;
};

export const DEFAULT_ANIMATION_EVENT_TYPES: AnimationEventType[] = [
  "animationend",
];

export default function useAnimation<T extends HTMLElement>({
  animationEventTypes = DEFAULT_ANIMATION_EVENT_TYPES,
  animationNames,
  externalRef,
  onAnimation,
}: AnimationProps<T>) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onAnimation || animationEventTypes.length === 0) {
      return;
    }

    const onAnimationHandler = (event: AnimationEvent) => {
      const { animationName } = event;
      if (animationNames && !animationNames.includes(animationName)) {
        return;
      }

      onAnimation?.(event);
    };

    for (let i = 0; i < animationEventTypes.length; i++) {
      currentElement.addEventListener(
        animationEventTypes[i],
        onAnimationHandler
      );
    }

    return () => {
      for (let i = 0; i < animationEventTypes.length; i++) {
        currentElement.removeEventListener(
          animationEventTypes[i],
          onAnimationHandler
        );
      }
    };
  }, [elementRef, animationEventTypes, animationNames, onAnimation]);

  return elementRef;
}
