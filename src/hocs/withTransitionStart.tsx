import React, { MutableRefObject } from "react";
import useTransitionStart from "../hooks/useTransitionStart";

type WithTransitionStartProps = {
  transitionClass?: string;
  onTransitionStart?: (event: TransitionEvent) => void;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
};

export default function withTransitionStart<P extends {}>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AnimatedComponent(
    props: Omit<P, keyof WithTransitionStartProps> & WithTransitionStartProps
  ) {
    const { transitionClass, onTransitionStart, wrapperRef, ...restProps } =
      props;

    const ref = useTransitionStart<HTMLDivElement>(
      onTransitionStart,
      wrapperRef
    );

    return wrapperRef ? (
      <WrappedComponent {...(restProps as P)} wrapperRef={wrapperRef} />
    ) : (
      <div ref={ref} className={transitionClass}>
        <WrappedComponent {...(restProps as P)} wrapperRef={ref} />
      </div>
    );
  };
}
