export enum GameStates {
  OFF = "off",
  SCENE_SETUP = "scene-setup",
  SCENE_TEARDOWN = "scene-teardown",
  BOARD_SETUP = "board-setup",
  BOARD_TEARDOWN = "board-teardown",
  COUNTDOWN = "countdown",
  ON = "on",
}

export const INTERACTIVE_STATES = [GameStates.OFF, GameStates.ON];
export const GAME_ELEMENTS_VISIBLE_STATES = [
  GameStates.BOARD_SETUP,
  GameStates.BOARD_TEARDOWN,
  GameStates.COUNTDOWN,
  GameStates.ON,
];
/* 
const offToOn = [
  GameStates.OFF,
  GameStates.SCENE_SETUP,
  GameStates.BOARD_SETUP,
  GameStates.COUNTDOWN,
  GameStates.ON,
];
const onToOff = [
  GameStates.ON,
  GameStates.BOARD_TEARDOWN,
  GameStates.SCENE_TEARDOWN,
  GameStates.OFF,
];
 */
