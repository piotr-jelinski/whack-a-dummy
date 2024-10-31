import { useEffect, useRef } from "react";

export default function useAnimationEnd<T extends HTMLElement>(
  onAnimationEnd?: (event: AnimationEvent) => void
) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onAnimationEnd) {
      return;
    }

    currentElement.addEventListener("animationend", onAnimationEnd);

    return () => {
      currentElement.removeEventListener("animationend", onAnimationEnd);
    };
  }, [onAnimationEnd]);

  return elementRef;
}
