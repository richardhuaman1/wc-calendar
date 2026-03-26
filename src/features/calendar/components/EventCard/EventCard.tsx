"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { getParticipantNames } from "@/features/calendar/utils/getParticipantNames";
import EventHeader from "./EventHeader";
import EventCardTbd from "./EventCardTbd";
import StreamBanner from "./StreamBanner";
import ParticipantList from "./ParticipantList";
import MarketSlider from "./MarketSlider";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  event: CalendarEvent;
  isExpanded: boolean;
  onExpand: () => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function EventCard({
  event,
  isExpanded,
  onExpand,
  onOddsToggle,
  isSelected,
}: EventCardProps) {
  const { home, away, hasTbd } = getParticipantNames(event);

  if (hasTbd) {
    return <EventCardTbd event={event} home={home} away={away} />;
  }

  return (
    <article className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}>
      {event.hasLiveStream && (
        <div
          className={`${styles.streamSection} ${isExpanded ? styles.streamSectionOpen : ""}`}
        >
          <div className={styles.streamInner}>
            <StreamBanner />
          </div>
        </div>
      )}

      <button
        className={styles.eventRow}
        onClick={onExpand}
        aria-expanded={isExpanded}
      >
        <EventHeader event={event} home={home} away={away} />
        <span
          className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`${styles.contentSection} ${isExpanded ? styles.contentSectionOpen : ""}`}
      >
        <div className={styles.contentInner}>
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
        </div>
      </div>
    </article>
  );
}
