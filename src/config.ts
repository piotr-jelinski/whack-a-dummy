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

export enum Pawns {
  AWAKENED_WELLNESS_WARRIOR = "awakened-wellness-warrior", //2 - 20
  BEWITCHED_OFFICE_DIVA = "bewitched-office-diva", //4 - 15
  LIFELESS_TEAM_PLAYER = "lifeless-team-player", // 1 - 20
  MONSTER_OF_MONEYMAKING = "monster-of-moneymaking", //5 - 10
  PHANTOM_OF_THE_LEDGER = "phantom-of-the-ledger", //6 - 10
  SCARECROW_OF_ACCOUNTABILITY = "scarecrow-of-accountability", //7 - 5
  SHADOWY_EXECUTIVE = "shadowy-executive", //8 - 5
  WRAP_IT_UP_WORRYWART = "wrap-it-up-worrywart", //3 - 15
}

export type PawnSettings = {
  height: number;
  occurrences: number;
  points: number;
  width: number;
};

export const PawnMap = new Map<Pawns, PawnSettings>([
  [
    Pawns.AWAKENED_WELLNESS_WARRIOR,
    {
      height: 170,
      occurrences: 20,
      points: 2,
      width: 120,
    },
  ],
  [
    Pawns.BEWITCHED_OFFICE_DIVA,
    {
      height: 180,
      occurrences: 15,
      points: 4,
      width: 120,
    },
  ],
  [
    Pawns.LIFELESS_TEAM_PLAYER,
    {
      height: 190,
      occurrences: 20,
      points: 1,
      width: 100,
    },
  ],
  [
    Pawns.MONSTER_OF_MONEYMAKING,
    {
      height: 200,
      occurrences: 10,
      points: 5,
      width: 110,
    },
  ],
  [
    Pawns.PHANTOM_OF_THE_LEDGER,
    {
      height: 160,
      occurrences: 10,
      points: 6,
      width: 130,
    },
  ],
  [
    Pawns.SCARECROW_OF_ACCOUNTABILITY,
    {
      height: 200,
      occurrences: 5,
      points: 7,
      width: 90,
    },
  ],
  [
    Pawns.SHADOWY_EXECUTIVE,
    {
      height: 160,
      occurrences: 5,
      points: 8,
      width: 120,
    },
  ],
  [
    Pawns.WRAP_IT_UP_WORRYWART,
    {
      height: 200,
      occurrences: 15,
      points: 3,
      width: 80,
    },
  ],
]);
