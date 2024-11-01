import { MutableRefObject, useEffect, useRef } from "react";

export default function useAnimationStart<T extends HTMLElement>(
  onAnimationStart?: (event: AnimationEvent) => void,
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onAnimationStart) {
      return;
    }

    currentElement.addEventListener("animationstart", onAnimationStart);

    return () => {
      currentElement.removeEventListener("animationstart", onAnimationStart);
    };
  }, [elementRef, onAnimationStart]);

  return elementRef;
}
