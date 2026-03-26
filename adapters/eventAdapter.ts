import { ApiEvent, ApiMarket, ApiSelection } from "@/types/api";
import { CalendarEvent, EventParticipant, Market, Selection } from "@/types/event";
import { getCountryCode, getShortCode, getGroupName } from "@/utils/countryMapping";
import { formatEventTime } from "@/utils/date";
import { parseScore } from "@/utils/parseScore";
import {
  DEFAULT_TOTAL_GOALS_LINE,
  MARKET_TYPE_OVER_UNDER,
  REQUIRED_MARKET_TYPE_IDS,
  VENUE_ROLE_HOME,
} from "@/utils/constants";

// ── Selection adapter ────────────────────────────────────────

function adaptSelection(raw: ApiSelection, marketTypeId: string): Selection {
  const needsPoints =
    marketTypeId === MARKET_TYPE_OVER_UNDER && raw.Points !== undefined;
  const displayName = needsPoints ? `${raw.Name} ${raw.Points}` : raw.Name;

  return {
    id: raw._id,
    name: displayName,
    odds: raw.DisplayOdds.Decimal,
    outcomeType: raw.OutcomeType,
    points: raw.Points,
    isDisabled: raw.IsDisabled,
  };
}

// ── Market adapter ───────────────────────────────────────────

function adaptMarket(raw: ApiMarket): Market {
  const typeId = raw.MarketType._id;
  let selections = raw.Selections;

  if (typeId === MARKET_TYPE_OVER_UNDER) {
    selections = selections.filter((s) => s.Points === DEFAULT_TOTAL_GOALS_LINE);
  }

  return {
    id: raw._id,
    typeId,
    name: raw.Name,
    isEarlyPayout: raw.IsEarlyPayout,
    selections: selections
      .sort((a, b) => a.Side - b.Side)
      .map((s) => adaptSelection(s, typeId)),
  };
}

function filterAndSortMarkets(apiMarkets: ApiMarket[]): Market[] {
  return REQUIRED_MARKET_TYPE_IDS.reduce<Market[]>((acc, typeId) => {
    const found = apiMarkets.find((m) => m.MarketType._id === typeId);
    if (found) acc.push(adaptMarket(found));
    return acc;
  }, []);
}

// ── Participant adapter ──────────────────────────────────────

function adaptParticipant(
  raw: { _id: string; Name: string; VenueRole: "Home" | "Away" },
  homeScore: string,
  awayScore: string
): EventParticipant {
  const isHome = raw.VenueRole === VENUE_ROLE_HOME;
  const rawScore = isHome ? homeScore : awayScore;

  return {
    id: raw._id,
    name: raw.Name,
    countryCode: getCountryCode(raw.Name),
    shortCode: getShortCode(raw.Name),
    role: raw.VenueRole,
    score: parseScore(rawScore),
  };
}

// ── Event adapter (public) ───────────────────────────────────

export function adaptApiEventToDomain(raw: ApiEvent): CalendarEvent {
  const home = raw.Participants.find((p) => p.VenueRole === VENUE_ROLE_HOME);
  const away = raw.Participants.find((p) => p.VenueRole !== VENUE_ROLE_HOME);

  return {
    id: raw._id,
    name: raw.EventName,
    groupName: getGroupName(home?.Name ?? "", away?.Name ?? ""),
    time: formatEventTime(raw.StartEventDate),
    startDate: raw.StartEventDate,
    league: raw.LeagueName,
    participants: raw.Participants.map((p) =>
      adaptParticipant(p, raw.Score.HomeScore, raw.Score.AwayScore)
    ),
    hasStats: raw.Settings.HasStatistics,
    hasBetBuilder: raw.Settings.IsBetBuilderEnabled,
    isEarlyPayout: raw.IsEarlyPayout,
    hasLiveStream: false,
    markets: filterAndSortMarkets(raw.Markets),
    totalMarketsCount: raw.TotalMarketsCount,
  };
}
