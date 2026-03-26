export const VENUE_ROLE_HOME = "Home" as const;
export const VENUE_ROLE_AWAY = "Away" as const;

export const TBD = "Por definir";
export const TEAM_SEPARATOR = "vs";

export const LEAGUE_NAME = "Copa Mundial 2026";

export const KNOCKOUT_ROUNDS = {
  ROUND_OF_16: "16vos",
  QUARTER_FINALS: "8vos",
  SEMI_FINALS: "4tos",
  SEMI: "Semi",
  THIRD_PLACE: "3er puesto",
  FINAL: "Final",
} as const;

export const GROUP_STAGE_FALLBACK = "Fase de grupos";

export const MARKET_TYPE_OVER_UNDER = "OU200";

export const REQUIRED_MARKET_TYPE_IDS = [
  "ML0",
  MARKET_TYPE_OVER_UNDER,
  "QA158",
  "ML235",
] as const;

export const DEFAULT_TOTAL_GOALS_LINE = 2.5;

export const SUPER_CUOTA_MARKET_TYPE_ID = "ML5000";
export const SUPER_CUOTA_BADGE_LABEL = "SC";

export const DATA_ATTR_DATE_KEY = "data-date-key";

export const MONTH_OBSERVER_ROOT_MARGIN = "0px 0px -50% 0px";
export const MONTH_OBSERVER_THRESHOLD = 0;

export const SKELETON_GROUPS = [3, 3, 3];

export const WEEK_HOURS = Array.from({ length: 24 }, (_, i) => i);
export const WEEK_ROW_HEIGHT = 32;
export const WEEK_TIME_LABEL_WIDTH = 28;
export const WEEK_EVENT_DURATION_ROWS = 4;
export const WEEK_CARD_NAME_MAX_LENGTH = 7;
