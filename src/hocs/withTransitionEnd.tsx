import React, { MutableRefObject } from "react";
import useTransitionEnd from "../hooks/useTransitionEnd";

type WithTransitionEndProps = {
  transitionClass?: string;
  onTransitionEnd?: (event: TransitionEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withTransitionEnd<P extends {}>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithTransitionEndProps> & WithTransitionEndProps
  ) {
    const { transitionClass, onTransitionEnd, wrapperRef, ...restProps } =
      props;

    const ref = useTransitionEnd<HTMLDivElement>(onTransitionEnd, wrapperRef);

    return wrapperRef ? (
      <WrappedComponent {...(restProps as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={transitionClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
