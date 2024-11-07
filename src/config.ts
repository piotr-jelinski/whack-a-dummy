export enum GameStates {
  OFF = "off",
  SCENE_SETUP = "scene-setup",
  SCENE_TEARDOWN = "scene-teardown",
  BOARD_SETUP = "board-setup",
  BOARD_TEARDOWN = "board-teardown",
  ON = "on",
}

export const INTERACTIVE_STATES = [GameStates.OFF, GameStates.ON];
export const GAME_ELEMENTS_VISIBLE_STATES = [
  GameStates.BOARD_SETUP,
  GameStates.BOARD_TEARDOWN,
  GameStates.ON,
];

export enum BoardStates {
  SET_UP = "set-up",
  TORN_DOWN = "torn-down",
}

export const GAME_DURATION = 60;
