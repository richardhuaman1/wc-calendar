import { CalendarEvent } from "@/types/event";
import { TBD } from "@/utils/constants";
import { formatEventTime } from "@/utils/date";

interface KnockoutFixture {
  id: string;
  round: string;
  date: string;
}

function createKnockoutEvent(fixture: KnockoutFixture): CalendarEvent {
  return {
    id: fixture.id,
    name: `${TBD} vs ${TBD}`,
    groupName: fixture.round,
    time: formatEventTime(fixture.date),
    startDate: fixture.date,
    league: "Copa Mundial 2026",
    participants: [
      { id: `${fixture.id}-h`, name: TBD, countryCode: "", role: "Home" },
      { id: `${fixture.id}-a`, name: TBD, countryCode: "", role: "Away" },
    ],
    hasStats: false,
    hasBetBuilder: false,
    isEarlyPayout: false,
    markets: [],
    totalMarketsCount: 0,
    hasLiveStream: false,
  };
}

const KNOCKOUT_FIXTURES: KnockoutFixture[] = [
  // 16vos — Jun 28 a Jul 3
  { id: "ko-r16-01", round: "16vos", date: "2026-06-28T19:00:00.000Z" },
  { id: "ko-r16-02", round: "16vos", date: "2026-06-28T22:00:00.000Z" },
  { id: "ko-r16-03", round: "16vos", date: "2026-06-29T01:00:00.000Z" },
  { id: "ko-r16-04", round: "16vos", date: "2026-06-29T19:00:00.000Z" },
  { id: "ko-r16-05", round: "16vos", date: "2026-06-29T22:00:00.000Z" },
  { id: "ko-r16-06", round: "16vos", date: "2026-06-30T01:00:00.000Z" },
  { id: "ko-r16-07", round: "16vos", date: "2026-06-30T19:00:00.000Z" },
  { id: "ko-r16-08", round: "16vos", date: "2026-06-30T22:00:00.000Z" },
  { id: "ko-r16-09", round: "16vos", date: "2026-07-01T01:00:00.000Z" },
  { id: "ko-r16-10", round: "16vos", date: "2026-07-01T19:00:00.000Z" },
  { id: "ko-r16-11", round: "16vos", date: "2026-07-01T22:00:00.000Z" },
  { id: "ko-r16-12", round: "16vos", date: "2026-07-02T01:00:00.000Z" },
  { id: "ko-r16-13", round: "16vos", date: "2026-07-02T19:00:00.000Z" },
  { id: "ko-r16-14", round: "16vos", date: "2026-07-02T22:00:00.000Z" },
  { id: "ko-r16-15", round: "16vos", date: "2026-07-03T01:00:00.000Z" },
  { id: "ko-r16-16", round: "16vos", date: "2026-07-03T22:00:00.000Z" },

  // 8vos — Jul 5-6
  { id: "ko-qf-01", round: "8vos", date: "2026-07-05T19:00:00.000Z" },
  { id: "ko-qf-02", round: "8vos", date: "2026-07-05T22:00:00.000Z" },
  { id: "ko-qf-03", round: "8vos", date: "2026-07-06T01:00:00.000Z" },
  { id: "ko-qf-04", round: "8vos", date: "2026-07-06T19:00:00.000Z" },
  { id: "ko-qf-05", round: "8vos", date: "2026-07-06T22:00:00.000Z" },
  { id: "ko-qf-06", round: "8vos", date: "2026-07-07T01:00:00.000Z" },
  { id: "ko-qf-07", round: "8vos", date: "2026-07-07T19:00:00.000Z" },
  { id: "ko-qf-08", round: "8vos", date: "2026-07-07T22:00:00.000Z" },

  // 4tos — Jul 9-10
  { id: "ko-sf-01", round: "4tos", date: "2026-07-09T22:00:00.000Z" },
  { id: "ko-sf-02", round: "4tos", date: "2026-07-10T01:00:00.000Z" },
  { id: "ko-sf-03", round: "4tos", date: "2026-07-10T22:00:00.000Z" },
  { id: "ko-sf-04", round: "4tos", date: "2026-07-11T01:00:00.000Z" },

  // Semifinales — Jul 13-14
  { id: "ko-semi-01", round: "Semi", date: "2026-07-14T01:00:00.000Z" },
  { id: "ko-semi-02", round: "Semi", date: "2026-07-15T01:00:00.000Z" },

  // 3er puesto — Jul 18
  { id: "ko-3rd", round: "3er puesto", date: "2026-07-18T22:00:00.000Z" },

  // Final — Jul 19
  { id: "ko-final", round: "Final", date: "2026-07-19T22:00:00.000Z" },
];

export const KNOCKOUT_EVENTS: CalendarEvent[] = KNOCKOUT_FIXTURES.map(createKnockoutEvent);
