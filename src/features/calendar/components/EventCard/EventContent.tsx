"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { getParticipantNames } from "@/features/calendar/utils/getParticipantNames";
import EventHeader from "./EventHeader";
import StreamBanner from "./StreamBanner";
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
  const { home, away } = getParticipantNames(event);

  return (
    <article className={styles.contentBody}>
      {event.hasLiveStream && <StreamBanner />}

      <EventHeader event={event} home={home} away={away} />

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
