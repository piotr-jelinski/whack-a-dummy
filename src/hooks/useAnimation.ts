import { MutableRefObject, useEffect, useRef } from "react";
import type { AnimationEventType } from "../types";

export const DEFAULT_ANIMATION_EVENT_TYPES: AnimationEventType[] = [
  "animationend",
  "animationstart",
];

export default function useAnimation<T extends HTMLElement>(
  onAnimation?: (event: AnimationEvent) => void,
  animationEventTypes: AnimationEventType[] = DEFAULT_ANIMATION_EVENT_TYPES,
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onAnimation) {
      return;
    }

    for (let i = 0; i < animationEventTypes.length; i++) {
      currentElement.addEventListener(animationEventTypes[i], onAnimation);
    }

    return () => {
      for (let i = 0; i < animationEventTypes.length; i++) {
        currentElement.removeEventListener(animationEventTypes[i], onAnimation);
      }
    };
  }, [elementRef, animationEventTypes, onAnimation]);

  return elementRef;
}
