export type AnimationEventType =
  | "animationcancel"
  | "animationend"
  | "animationiteration"
  | "animationstart";

export type TransitionEventType =
  | "transitioncancel"
  | "transitionend"
  | "transitionrun"
  | "transitionstart";

export type PawnSettings = {
  occurrences: number;
  points: number;
};
