import { MutableRefObject, useEffect, useRef } from "react";

export type AnimationEventType =
  | "animationend"
  | "animationiteration"
  | "animationstart";
export const DEFAULT_ANIMATION_EVENT_TYPES: AnimationEventType[] = [
  "animationend",
];

export default function useAnimationTransformPreserve<T extends HTMLElement>(
  onAnimationTransformPreserve?: (event: AnimationEvent) => void,
  eventTypes: AnimationEventType[] = [],
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) {
      return;
    }

    const onAnimationTransform = (event: AnimationEvent) => {
      if (!eventTypes.includes(event.type as AnimationEventType)) {
        return;
      }

      const { currentTarget } = event;
      const element = currentTarget as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      const transformMatrix = computedStyle.transform;

      if (transformMatrix !== null && transformMatrix !== "none") {
        const match = transformMatrix.match(/matrix\(([^)]+)\)/);
        const matrixValues = match ? match[1].split(", ") : [];
        const x = parseFloat(matrixValues[4] ?? "0");
        const y = parseFloat(matrixValues[5] ?? "0");
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        element.style.setProperty("--pos-x", `${x}px`);
        element.style.setProperty("--pos-y", `${y}px`);
      }

      onAnimationTransformPreserve?.(event);
    };

    for (let i = 0; i < eventTypes.length; i++) {
      currentElement.addEventListener(eventTypes[i], onAnimationTransform);
    }

    return () => {
      for (let i = 0; i < eventTypes.length; i++) {
        currentElement.removeEventListener(eventTypes[i], onAnimationTransform);
      }
    };
  }, [elementRef, eventTypes, onAnimationTransformPreserve]);

  return elementRef;
}
