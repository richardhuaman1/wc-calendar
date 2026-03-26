import { CalendarEvent, EventParticipant } from "@/features/calendar/types/event";
import { TBD, VENUE_ROLE_HOME, VENUE_ROLE_AWAY } from "./constants";

export interface EventParticipants {
  home?: EventParticipant;
  away?: EventParticipant;
}

export interface ParticipantNames {
  home: string;
  away: string;
  hasTbd: boolean;
}

export function getEventParticipants(event: CalendarEvent): EventParticipants {
  return {
    home: event.participants.find((p) => p.role === VENUE_ROLE_HOME),
    away: event.participants.find((p) => p.role === VENUE_ROLE_AWAY),
  };
}

export function getParticipantNames(event: CalendarEvent): ParticipantNames {
  const { home, away } = getEventParticipants(event);
  const homeName = home?.name ?? TBD;
  const awayName = away?.name ?? TBD;

  return { home: homeName, away: awayName, hasTbd: homeName === TBD || awayName === TBD };
}

export function isLiveEvent(event: CalendarEvent): boolean {
  const { home, away } = getEventParticipants(event);
  return home?.score !== undefined && away?.score !== undefined;
}
