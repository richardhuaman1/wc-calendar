"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { TBD, VENUE_ROLE_HOME } from "@/features/calendar/utils/constants";
import { STREAM_BANNER_TEXT } from "@/shared/constants/labels";
import PlayIcon from "@/shared/components/icons/PlayIcon";
import EventHeader from "./EventHeader";
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
  const homeName = event.participants.find((p) => p.role === VENUE_ROLE_HOME)?.name ?? TBD;
  const awayName = event.participants.find((p) => p.role !== VENUE_ROLE_HOME)?.name ?? TBD;
  const hasTbd = homeName === TBD || awayName === TBD;

  if (hasTbd) {
    return (
      <article className={styles.card}>
        <div className={styles.eventRow}>
          <EventHeader event={event} home={homeName} away={awayName} />
        </div>
      </article>
    );
  }

  return (
    <article className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}>
      {event.hasLiveStream && (
        <div
          className={`${styles.streamSection} ${isExpanded ? styles.streamSectionOpen : ""}`}
        >
          <div className={styles.streamInner}>
            <div className={styles.streamBanner}>
              <PlayIcon />
              <span className={styles.streamText}>
                {STREAM_BANNER_TEXT}
              </span>
            </div>
          </div>
        </div>
      )}

      <button className={styles.eventRow} onClick={onExpand}>
        <EventHeader event={event} home={homeName} away={awayName} />
        <span
          className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ""}`}
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
