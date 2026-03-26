import { EventParticipant } from "@/features/calendar/types/event";
import { TBD, WEEK_CARD_NAME_MAX_LENGTH } from "@/features/calendar/utils/constants";

export function truncateName(
  name: string,
  maxLength: number = WEEK_CARD_NAME_MAX_LENGTH
): string {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength).trimEnd() + "…";
}

export function getParticipantDisplayName(
  participant: EventParticipant,
  compact: boolean
): string {
  if (participant.name === TBD) return TBD;
  return compact ? participant.shortCode : truncateName(participant.name);
}

export function formatHourTime(hour: number): string {
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:00`;
}

export function formatHourPeriod(hour: number): string {
  return hour < 12 ? "AM" : "PM";
}
