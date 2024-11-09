import { PawnSettings } from "./types";

export enum GameStates {
  OFF = "off",
  SCENE_SETUP = "scene-setup",
  SCENE_TEARDOWN = "scene-teardown",
  BOARD_SETUP = "board-setup",
  BOARD_TEARDOWN = "board-teardown",
  ON = "on",
}

export enum BoardStates {
  SET_UP = "set-up",
  TORN_DOWN = "torn-down",
}

export enum Pawns {
  AWAKENED_WELLNESS_WARRIOR = "awakened-wellness-warrior",
  BEWITCHED_OFFICE_DIVA = "bewitched-office-diva",
  LIFELESS_TEAM_PLAYER = "lifeless-team-player",
  MONSTER_OF_MONEYMAKING = "monster-of-moneymaking",
  PHANTOM_OF_THE_LEDGER = "phantom-of-the-ledger",
  SCARECROW_OF_ACCOUNTABILITY = "scarecrow-of-accountability",
  SHADOWY_EXECUTIVE = "shadowy-executive",
  WRAP_IT_UP_WORRYWART = "wrap-it-up-worrywart",
}

export const INTERACTIVE_STATES = [GameStates.OFF, GameStates.ON];
export const GAME_ELEMENTS_VISIBLE_STATES = [
  GameStates.BOARD_SETUP,
  GameStates.BOARD_TEARDOWN,
  GameStates.ON,
];
export const GAME_IN_SET_UP_STATE = [GameStates.ON, GameStates.BOARD_SETUP];

export const HOLE_COUNT = 25;
export const GAME_DURATION_S = 50;
export const INITIAL_PAWN_COUNT = 5;
export const PAWN_SPAWN_DELAY_MS = 600;
// note that this will immediately spawn 2 pawns on the board, and then the interval will start adding more
// depending on the PAWN_SPAWN_DELAY_MS this may result in a total of up to MAX_PAWNS_ON_BOARD pawns on the board immediately
export const START_PAWNS_ON_BOARD = 2;
export const MAX_PAWNS_ON_BOARD = 4;

export const holeArray = Array.from({ length: HOLE_COUNT }).map(
  (_, index) => (index + 1) % 2 === 1
);
export const activeHoleIndexArray = holeArray
  .map((isActive, index) => (isActive ? index : null))
  .filter((i) => i !== null);

export const pawnMap = new Map<Pawns, PawnSettings>([
  [
    Pawns.AWAKENED_WELLNESS_WARRIOR,
    {
      occurrences: 20,
      points: 2,
    },
  ],
  [
    Pawns.BEWITCHED_OFFICE_DIVA,
    {
      occurrences: 15,
      points: 6,
    },
  ],
  [
    Pawns.LIFELESS_TEAM_PLAYER,
    {
      occurrences: 20,
      points: 1,
    },
  ],
  [
    Pawns.MONSTER_OF_MONEYMAKING,
    {
      occurrences: 10,
      points: 8,
    },
  ],
  [
    Pawns.PHANTOM_OF_THE_LEDGER,
    {
      occurrences: 10,
      points: 10,
    },
  ],
  [
    Pawns.SCARECROW_OF_ACCOUNTABILITY,
    {
      occurrences: 5,
      points: 12,
    },
  ],
  [
    Pawns.SHADOWY_EXECUTIVE,
    {
      occurrences: 5,
      points: 14,
    },
  ],
  [
    Pawns.WRAP_IT_UP_WORRYWART,
    {
      occurrences: 15,
      points: 4,
    },
  ],
]);
