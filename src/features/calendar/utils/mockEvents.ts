import { CalendarEvent, EventParticipant, Market } from "@/features/calendar/types/event";
import {
  TBD,
  TEAM_SEPARATOR,
  LEAGUE_NAME,
  KNOCKOUT_ROUNDS,
  VENUE_ROLE_HOME,
  VENUE_ROLE_AWAY,
} from "@/features/calendar/utils/constants";
import { formatEventTime } from "@/features/calendar/utils/date";
import { getCountryCode, getShortCode, getGroupName } from "@/features/calendar/utils/countryMapping";

function createMockMarkets(homeShort: string, awayShort: string): Market[] {
  return [
    {
      id: `mkt-1x2-${homeShort}`,
      typeId: "ML0",
      name: "Resultado del partido (1x2)",
      isEarlyPayout: false,
      selections: [
        { id: `sel-h-${homeShort}`, name: homeShort, odds: "1.45", outcomeType: "Home", isDisabled: false },
        { id: `sel-d-${homeShort}`, name: "Empate", odds: "2.00", outcomeType: "Draw", isDisabled: false },
        { id: `sel-a-${awayShort}`, name: awayShort, odds: "2.25", outcomeType: "Away", isDisabled: false },
      ],
    },
  ];
}

export interface TeamInfo {
  name: string;
  countryCode: string;
  shortCode: string;
}

const team = (name: string): TeamInfo => ({
  name,
  countryCode: getCountryCode(name),
  shortCode: getShortCode(name),
});

export const TEAMS = {
  // Group A
  MEXICO: team("México"),
  SOUTH_AFRICA: team("Sudáfrica"),
  SOUTH_KOREA: team("Corea del Sur"),
  // Group B
  USA: team("EE.UU."),
  PARAGUAY: team("Paraguay"),
  AUSTRALIA: team("Australia"),
  // Group C
  QATAR: team("Catar"),
  SWITZERLAND: team("Suiza"),
  CANADA: team("Canadá"),
  // Group D
  BRAZIL: team("Brasil"),
  MOROCCO: team("Marruecos"),
  HAITI: team("Haití"),
  SCOTLAND: team("Escocia"),
  // Group E
  BELGIUM: team("Bélgica"),
  EGYPT: team("Egipto"),
  IRAN: team("Irán"),
  NEW_ZEALAND: team("Nueva Zelanda"),
  // Group F
  GERMANY: team("Alemania"),
  CURACAO: team("Curazao"),
  AUSTRIA: team("Austria"),
  JORDAN: team("Jordania"),
  // Group G
  NETHERLANDS: team("Países Bajos"),
  JAPAN: team("Japón"),
  IVORY_COAST: team("Costa de Marfil"),
  ECUADOR: team("Ecuador"),
  // Group H
  SPAIN: team("España"),
  CAPE_VERDE: team("Cabo Verde"),
  SAUDI_ARABIA: team("Arabia Saudita"),
  URUGUAY: team("Uruguay"),
  // Group I
  FRANCE: team("Francia"),
  SENEGAL: team("Senegal"),
  ARGENTINA: team("Argentina"),
  ALGERIA: team("Argelia"),
  // Group J
  ENGLAND: team("Inglaterra"),
  CROATIA: team("Croacia"),
  GHANA: team("Ghana"),
  PANAMA: team("Panamá"),
  // Group K
  UZBEKISTAN: team("Uzbekistán"),
  COLOMBIA: team("Colombia"),
  POLAND: team("Polonia"),
  PORTUGAL: team("Portugal"),
  DENMARK: team("Dinamarca"),
} as const;

const TBD_TEAM: TeamInfo = { name: TBD, countryCode: "", shortCode: "" };

interface ParticipantOverrides {
  team?: TeamInfo;
  score?: number;
  role?: "Home" | "Away";
}

function createParticipant(
  id: string,
  role: "Home" | "Away",
  overrides?: ParticipantOverrides
): EventParticipant {
  const teamInfo = overrides?.team ?? TBD_TEAM;
  return {
    id,
    name: teamInfo.name,
    countryCode: teamInfo.countryCode,
    shortCode: teamInfo.shortCode,
    role: overrides?.role ?? role,
    score: overrides?.score,
  };
}

interface MockEventConfig {
  id: string;
  date: string;
  round: string;
  home?: ParticipantOverrides;
  away?: ParticipantOverrides;
  isLive?: boolean;
  markets?: CalendarEvent["markets"];
  totalMarketsCount?: number;
  hasStats?: boolean;
  hasBetBuilder?: boolean;
  isEarlyPayout?: boolean;
  hasLiveStream?: boolean;
}

export function createMockEvent(config: MockEventConfig): CalendarEvent {
  const homeTeam = config.home?.team ?? TBD_TEAM;
  const awayTeam = config.away?.team ?? TBD_TEAM;
  const homeName = homeTeam.name;
  const awayName = awayTeam.name;

  return {
    id: config.id,
    name: `${homeName} ${TEAM_SEPARATOR} ${awayName}`,
    groupName: homeName === TBD && awayName === TBD
      ? config.round
      : getGroupName(homeName, awayName) || config.round,
    time: formatEventTime(config.date),
    startDate: config.date,
    league: LEAGUE_NAME,
    participants: [
      createParticipant(`${config.id}-h`, VENUE_ROLE_HOME, config.home),
      createParticipant(`${config.id}-a`, VENUE_ROLE_AWAY, config.away),
    ],
    hasStats: config.hasStats ?? false,
    hasBetBuilder: config.hasBetBuilder ?? false,
    isEarlyPayout: config.isEarlyPayout ?? false,
    hasLiveStream: config.hasLiveStream ?? false,
    markets: config.markets ?? [],
    totalMarketsCount: config.totalMarketsCount ?? 0,
  };
}

export function createSimultaneousEvents(
  baseConfig: Omit<MockEventConfig, "id">,
  matchups: Array<{ home: ParticipantOverrides; away: ParticipantOverrides }>,
  idPrefix: string
): CalendarEvent[] {
  return matchups.map((matchup, i) =>
    createMockEvent({
      ...baseConfig,
      id: `${idPrefix}-${i + 1}`,
      home: matchup.home,
      away: matchup.away,
    })
  );
}

interface KnockoutFixture {
  id: string;
  round: string;
  date: string;
  home?: ParticipantOverrides;
  away?: ParticipantOverrides;
  markets?: Market[];
  totalMarketsCount?: number;
}

const KNOCKOUT_FIXTURES: KnockoutFixture[] = [
  { id: "ko-r16-01", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-28T19:00:00.000Z",
    home: { team: TEAMS.MEXICO }, away: { team: TEAMS.NETHERLANDS } },
  // Simultaneous with r16-01: tests 2 events at same time
  { id: "ko-r16-01b", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-28T19:00:00.000Z",
    home: { team: TEAMS.SOUTH_AFRICA }, away: { team: TEAMS.QATAR } },
  { id: "ko-r16-02", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-28T22:00:00.000Z",
    home: { team: TEAMS.USA }, away: { team: TEAMS.JAPAN } },
  { id: "ko-r16-03", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T01:00:00.000Z",
    home: { team: TEAMS.SWITZERLAND }, away: { team: TEAMS.SENEGAL } },
  { id: "ko-r16-04", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T19:00:00.000Z",
    home: { team: TEAMS.BRAZIL }, away: { team: TEAMS.SOUTH_KOREA },
    markets: createMockMarkets("Brasil", "C. del Sur"), totalMarketsCount: 50 },
  // Simultaneous with r16-04: tests 4 events at same time
  { id: "ko-r16-04b", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T19:00:00.000Z",
    home: { team: TEAMS.PARAGUAY }, away: { team: TEAMS.CURACAO },
    markets: createMockMarkets("Paraguay", "Curazao"), totalMarketsCount: 25 },
  { id: "ko-r16-04c", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T19:00:00.000Z",
    home: { team: TEAMS.JORDAN }, away: { team: TEAMS.UZBEKISTAN },
    markets: createMockMarkets("Jordania", "Uzbekistán"), totalMarketsCount: 20 },
  { id: "ko-r16-04d", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T19:00:00.000Z",
    home: { team: TEAMS.ALGERIA }, away: { team: TEAMS.GHANA },
    markets: createMockMarkets("Argelia", "Ghana"), totalMarketsCount: 22 },
  { id: "ko-r16-05", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-29T22:00:00.000Z",
    home: { team: TEAMS.BELGIUM }, away: { team: TEAMS.URUGUAY } },
  { id: "ko-r16-06", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-30T01:00:00.000Z",
    home: { team: TEAMS.GERMANY }, away: { team: TEAMS.EGYPT } },
  { id: "ko-r16-07", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-30T19:00:00.000Z",
    home: { team: TEAMS.FRANCE }, away: { team: TEAMS.CROATIA },
    markets: createMockMarkets("Francia", "Croacia"), totalMarketsCount: 45 },
  // Simultaneous with r16-07: tests 3 events at same time
  { id: "ko-r16-07b", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-30T19:00:00.000Z",
    home: { team: TEAMS.HAITI }, away: { team: TEAMS.NEW_ZEALAND },
    markets: createMockMarkets("Haití", "N. Zelanda"), totalMarketsCount: 30 },
  { id: "ko-r16-07c", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-30T19:00:00.000Z",
    home: { team: TEAMS.CAPE_VERDE }, away: { team: TEAMS.SAUDI_ARABIA },
    markets: createMockMarkets("C. Verde", "A. Saudita"), totalMarketsCount: 28 },
  { id: "ko-r16-08", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-06-30T22:00:00.000Z",
    home: { team: TEAMS.SPAIN }, away: { team: TEAMS.COLOMBIA } },
  { id: "ko-r16-09", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T01:00:00.000Z",
    home: { team: TEAMS.ARGENTINA }, away: { team: TEAMS.AUSTRALIA } },
  { id: "ko-r16-10", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T19:00:00.000Z",
    home: { team: TEAMS.ENGLAND }, away: { team: TEAMS.ECUADOR },
    markets: createMockMarkets("Inglaterra", "Ecuador"), totalMarketsCount: 48 },
  // Simultaneous with r16-10: tests 5 events at same time
  { id: "ko-r16-10b", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T19:00:00.000Z",
    home: { team: TEAMS.SCOTLAND }, away: { team: TEAMS.SENEGAL },
    markets: createMockMarkets("Escocia", "Senegal"), totalMarketsCount: 18 },
  { id: "ko-r16-10c", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T19:00:00.000Z",
    home: { team: TEAMS.NEW_ZEALAND }, away: { team: TEAMS.IRAN },
    markets: createMockMarkets("N. Zelanda", "Irán"), totalMarketsCount: 15 },
  { id: "ko-r16-10d", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T19:00:00.000Z",
    home: { team: TEAMS.SOUTH_AFRICA }, away: { team: TEAMS.PANAMA },
    markets: createMockMarkets("Sudáfrica", "Panamá"), totalMarketsCount: 16 },
  { id: "ko-r16-10e", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T19:00:00.000Z",
    home: { team: TEAMS.HAITI }, away: { team: TEAMS.CAPE_VERDE },
    markets: createMockMarkets("Haití", "C. Verde"), totalMarketsCount: 12 },
  { id: "ko-r16-11", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-01T22:00:00.000Z",
    home: { team: TEAMS.MOROCCO }, away: { team: TEAMS.AUSTRIA } },
  { id: "ko-r16-12", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-02T01:00:00.000Z",
    home: { team: TEAMS.PORTUGAL }, away: { team: TEAMS.CANADA } },
  { id: "ko-r16-13", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-02T19:00:00.000Z",
    home: { team: TEAMS.POLAND }, away: { team: TEAMS.IVORY_COAST } },
  { id: "ko-r16-14", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-02T22:00:00.000Z",
    home: { team: TEAMS.DENMARK }, away: { team: TEAMS.GHANA } },
  { id: "ko-r16-15", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-03T01:00:00.000Z",
    home: { team: TEAMS.IRAN }, away: { team: TEAMS.PANAMA } },
  { id: "ko-r16-16", round: KNOCKOUT_ROUNDS.ROUND_OF_16, date: "2026-07-03T22:00:00.000Z",
    home: { team: TEAMS.ALGERIA }, away: { team: TEAMS.SCOTLAND } },

  { id: "ko-qf-01", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-05T19:00:00.000Z" },
  { id: "ko-qf-02", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-05T22:00:00.000Z" },
  { id: "ko-qf-03", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-06T01:00:00.000Z" },
  { id: "ko-qf-04", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-06T19:00:00.000Z" },
  { id: "ko-qf-05", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-06T22:00:00.000Z" },
  { id: "ko-qf-06", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-07T01:00:00.000Z" },
  { id: "ko-qf-07", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-07T19:00:00.000Z" },
  { id: "ko-qf-08", round: KNOCKOUT_ROUNDS.QUARTER_FINALS, date: "2026-07-07T22:00:00.000Z" },

  { id: "ko-sf-01", round: KNOCKOUT_ROUNDS.SEMI_FINALS, date: "2026-07-09T22:00:00.000Z" },
  { id: "ko-sf-02", round: KNOCKOUT_ROUNDS.SEMI_FINALS, date: "2026-07-10T01:00:00.000Z" },
  { id: "ko-sf-03", round: KNOCKOUT_ROUNDS.SEMI_FINALS, date: "2026-07-10T22:00:00.000Z" },
  { id: "ko-sf-04", round: KNOCKOUT_ROUNDS.SEMI_FINALS, date: "2026-07-11T01:00:00.000Z" },

  { id: "ko-semi-01", round: KNOCKOUT_ROUNDS.SEMI, date: "2026-07-14T01:00:00.000Z" },
  { id: "ko-semi-02", round: KNOCKOUT_ROUNDS.SEMI, date: "2026-07-15T01:00:00.000Z" },

  { id: "ko-3rd", round: KNOCKOUT_ROUNDS.THIRD_PLACE, date: "2026-07-18T22:00:00.000Z" },

  { id: "ko-final", round: KNOCKOUT_ROUNDS.FINAL, date: "2026-07-19T22:00:00.000Z" },
];

export const MOCK_EVENTS: CalendarEvent[] = KNOCKOUT_FIXTURES.map((fixture) =>
  createMockEvent({
    id: fixture.id,
    date: fixture.date,
    round: fixture.round,
    home: fixture.home,
    away: fixture.away,
    markets: fixture.markets,
    totalMarketsCount: fixture.totalMarketsCount,
  })
);
