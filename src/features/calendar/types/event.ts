export interface Selection {
  id: string;
  name: string;
  odds: string;
  outcomeType: string;
  points?: number;
  isDisabled: boolean;
}

export interface Market {
  id: string;
  typeId: string;
  name: string;
  isEarlyPayout: boolean;
  selections: Selection[];
}

export interface EventParticipant {
  id: string;
  name: string;
  countryCode: string;
  shortCode: string;
  role: "Home" | "Away";
  score?: number;
  isSponsored?: boolean;
}

export interface CalendarEvent {
  id: string;
  name: string;
  groupName: string;
  time: string;
  startDate: string;
  league: string;
  participants: EventParticipant[];
  hasStats: boolean;
  hasBetBuilder: boolean;
  isEarlyPayout: boolean;
  hasLiveStream?: boolean;
  markets: Market[];
  totalMarketsCount: number;
}

export interface DayGroup {
  date: Date;
  events: CalendarEvent[];
}

export type OddsToggleFn = (
  selection: Selection,
  eventId: string,
  eventName: string,
  marketName: string
) => void;

export type IsSelectedFn = (selectionId: string) => boolean;
