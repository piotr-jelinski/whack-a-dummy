import { MutableRefObject, useEffect, useRef } from "react";
import { AnimationEventType } from "../types";

type AnimationTransformPreserveProps<T> = {
  animationTransformPreserveEventTypes?: AnimationEventType[];
  animationTransformPreserveNames?: string[];
  externalRef?: MutableRefObject<T | null>;
  onAnimationTransformPreserve?: (event: AnimationEvent) => void;
};

export const DEFAULT_ANIMATION_TRANSFORM_EVENT_TYPES: AnimationEventType[] = [
  "animationend",
];

const SLICE_OF_PI = 180 / Math.PI;

export default function useAnimationTransformPreserve<T extends HTMLElement>({
  animationTransformPreserveEventTypes = DEFAULT_ANIMATION_TRANSFORM_EVENT_TYPES,
  animationTransformPreserveNames,
  externalRef,
  onAnimationTransformPreserve,
}: AnimationTransformPreserveProps<T>) {
  const internalRef = useRef<T | null>(null);
  const elementRef = externalRef || internalRef;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || animationTransformPreserveEventTypes.length === 0) {
      return;
    }

    const onAnimationTransformPreserveHandler = (event: AnimationEvent) => {
      const { animationName, currentTarget } = event;
      if (
        animationTransformPreserveNames &&
        !animationTransformPreserveNames.includes(animationName)
      ) {
        return;
      }

      const element = currentTarget as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      const transformMatrix =
        computedStyle.getPropertyValue("-webkit-transform") ||
        computedStyle.getPropertyValue("-moz-transform") ||
        computedStyle.getPropertyValue("-ms-transform") ||
        computedStyle.getPropertyValue("-o-transform") ||
        computedStyle.getPropertyValue("transform") ||
        "none";

      if (transformMatrix !== null && transformMatrix !== "none") {
        const is3D = transformMatrix.includes("matrix3d");
        const match = transformMatrix.match(/matrix(?:3d)?\(([^)]+)\)/);
        const matrixValues = match ? match[1].split(", ") : [];

        const x = parseFloat(matrixValues[is3D ? 12 : 4] ?? "0");
        const y = parseFloat(matrixValues[is3D ? 13 : 5] ?? "0");
        const z = parseFloat(is3D ? matrixValues[14] : "0");

        const m31 = parseFloat(matrixValues[8] ?? "0");
        const m32 = parseFloat(matrixValues[9] ?? "0");
        const m33 = parseFloat(matrixValues[10] ?? "1");
        const m21 = parseFloat(matrixValues[is3D ? 4 : 1] ?? "0");
        const m11 = parseFloat(matrixValues[0] ?? "1");

        const rotationX =
          Math.atan2(m32, m33) * (m33 < 0 && m32 > 0 ? -1 : 1) * SLICE_OF_PI;
        const rotationY = Math.asin(-m31) * SLICE_OF_PI;
        const rotationZ =
          -Math.atan2(m21, m11) *
          ((m21 > 0 && m11 >= 0) || (m21 <= 0 && m11 < 0) ? 1 : -1) *
          SLICE_OF_PI;

        element.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
        element.style.setProperty("--translate-x", `${x}px`);
        element.style.setProperty("--translate-y", `${y}px`);
        element.style.setProperty("--translate-z", `${z}px`);
        element.style.setProperty("--rotation-x", `${rotationX}deg`);
        element.style.setProperty("--rotation-y", `${rotationY}deg`);
        element.style.setProperty("--rotation-z", `${rotationZ}deg`);
      }

      onAnimationTransformPreserve?.(event);
    };

    for (let i = 0; i < animationTransformPreserveEventTypes.length; i++) {
      currentElement.addEventListener(
        animationTransformPreserveEventTypes[i],
        onAnimationTransformPreserveHandler
      );
    }

    return () => {
      for (let i = 0; i < animationTransformPreserveEventTypes.length; i++) {
        currentElement.removeEventListener(
          animationTransformPreserveEventTypes[i],
          onAnimationTransformPreserveHandler
        );
      }
    };
  }, [
    elementRef,
    animationTransformPreserveEventTypes,
    animationTransformPreserveNames,
    onAnimationTransformPreserve,
  ]);

  return elementRef;
}
