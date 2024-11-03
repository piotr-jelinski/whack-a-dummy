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
        const is3D = transformMatrix.includes("matrix3d");
        const match = transformMatrix.match(/matrix(?:3d)?\(([^)]+)\)/);
        const matrixValues = match ? match[1].split(", ") : [];

        const x = parseFloat(matrixValues[is3D ? 12 : 4] ?? "0");
        const y = parseFloat(matrixValues[is3D ? 13 : 5] ?? "0");
        const z = parseFloat(is3D ? matrixValues[14] : "0");

        const rotationX = Math.atan2(
          parseFloat(matrixValues[9] ?? "0"),
          parseFloat(matrixValues[10] ?? "1")
        );
        const rotationY = Math.atan2(
          -parseFloat(matrixValues[8] ?? "0"),
          Math.sqrt(
            parseFloat(matrixValues[9] ?? "0") ** 2 +
              parseFloat(matrixValues[10] ?? "1") ** 2
          )
        );
        const rotationZ = Math.atan2(
          parseFloat(matrixValues[is3D ? 4 : 1] ?? "0"),
          parseFloat(matrixValues[0] ?? "1")
        );

        // Convert rotations to degrees
        const rotationXDegrees = (rotationX * 180) / Math.PI;
        const rotationYDegrees = (rotationY * 180) / Math.PI;
        const rotationZDegrees = (rotationZ * 180) / Math.PI;

        element.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotationXDegrees}deg) rotateY(${rotationYDegrees}deg) rotateZ(${rotationZDegrees}deg)`;
        element.style.setProperty("--translate-x", `${x}px`);
        element.style.setProperty("--translate-y", `${y}px`);
        element.style.setProperty("--translate-z", `${z}px`);
        element.style.setProperty("--rotation-x", `${rotationXDegrees}deg`);
        element.style.setProperty("--rotation-y", `${rotationYDegrees}deg`);
        element.style.setProperty("--rotation-z", `${rotationZDegrees}deg`);
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
