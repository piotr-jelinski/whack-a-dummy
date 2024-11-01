import { MutableRefObject, useEffect, useRef } from "react";

export default function useAnimationEnd<T extends HTMLElement>(
  onAnimationEnd?: (event: AnimationEvent) => void,
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onAnimationEnd) {
      return;
    }

    currentElement.addEventListener("animationend", onAnimationEnd);

    return () => {
      currentElement.removeEventListener("animationend", onAnimationEnd);
    };
  }, [elementRef, onAnimationEnd]);

  return elementRef;
}
