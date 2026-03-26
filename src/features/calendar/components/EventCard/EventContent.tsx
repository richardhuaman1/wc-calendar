"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { TBD, VENUE_ROLE_HOME } from "@/features/calendar/utils/constants";
import { STREAM_BANNER_TEXT } from "@/shared/constants/labels";
import PlayIcon from "@/shared/components/icons/PlayIcon";
import EventHeader from "./EventHeader";
import ParticipantList from "./ParticipantList";
import MarketSlider from "./MarketSlider";
import styles from "./EventCard.module.scss";

interface EventContentProps {
  event: CalendarEvent;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function EventContent({
  event,
  onOddsToggle,
  isSelected,
}: EventContentProps) {
  const homeName =
    event.participants.find((p) => p.role === VENUE_ROLE_HOME)?.name ?? TBD;
  const awayName =
    event.participants.find((p) => p.role !== VENUE_ROLE_HOME)?.name ?? TBD;

  return (
    <article className={styles.contentBody}>
      {event.hasLiveStream && (
        <div className={styles.streamBanner}>
          <PlayIcon />
          <span className={styles.streamText}>{STREAM_BANNER_TEXT}</span>
        </div>
      )}

      <EventHeader event={event} home={homeName} away={awayName} />

      <div className={styles.divider} />

      <ParticipantList participants={event.participants} />

      {event.markets.length > 0 && (
        <MarketSlider
          markets={event.markets}
          eventId={event.id}
          eventName={event.name}
          onOddsToggle={onOddsToggle}
          isSelected={isSelected}
        />
      )}
    </article>
  );
}
