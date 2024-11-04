import { MutableRefObject, useEffect, useRef } from "react";

export default function useTransitionEnd<T extends HTMLElement>(
  onTransitionEnd?: (event: TransitionEvent) => void,
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onTransitionEnd) {
      return;
    }

    currentElement.addEventListener("transitionend", onTransitionEnd);

    return () => {
      currentElement.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [elementRef, onTransitionEnd]);

  return elementRef;
}
