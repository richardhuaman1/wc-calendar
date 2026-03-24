export interface OddsOption {
  id: string;
  label: string;
  value: string;
}

export interface Market {
  id: string;
  name: string;
  options: OddsOption[];
}

export interface EventParticipant {
  id: string;
  name: string;
  country: string;
  role: "Home" | "Away";
  isSponsored?: boolean;
  score?: number;
}

export interface CalendarEvent {
  id: string;
  name: string;
  groupName: string;
  time: string;
  startDate: Date;
  league: string;
  participants: EventParticipant[];
  hasStats: boolean;
  hasBetBuilder: boolean;
  isEarlyPayout: boolean;
  hasLiveStream?: boolean;
  markets?: Market[];
}

export interface DayGroup {
  date: Date;
  events: CalendarEvent[];
}
