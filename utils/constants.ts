// ── Domain: Participant roles ──────────────────────────────
export const VENUE_ROLE_HOME = "Home" as const;
export const VENUE_ROLE_AWAY = "Away" as const;

// ── Domain: Teams ──────────────────────────────────────────
export const TBD = "Por definir";
export const TEAM_SEPARATOR = "vs";

// ── Domain: Tournament ─────────────────────────────────────
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

// ── Domain: Markets ────────────────────────────────────────
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

// ── UI: Data attributes ────────────────────────────────────
export const DATA_ATTR_DATE_KEY = "data-date-key";

// ── UI: IntersectionObserver config ────────────────────────
export const MONTH_OBSERVER_ROOT_MARGIN = "0px 0px -50% 0px";
export const MONTH_OBSERVER_THRESHOLD = 0;

// ── UI: Skeleton config ────────────────────────────────────
export const SKELETON_GROUPS = [3, 3, 3];
