import { MutableRefObject, useEffect, useRef } from "react";

export default function useTransitionStart<T extends HTMLElement>(
  onTransitionStart?: (event: TransitionEvent) => void,
  externalRef?: MutableRefObject<T | null>
) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !onTransitionStart) {
      return;
    }

    currentElement.addEventListener("transitionstart", onTransitionStart);

    return () => {
      currentElement.removeEventListener("transitionstart", onTransitionStart);
    };
  }, [elementRef, onTransitionStart]);

  return elementRef;
}
