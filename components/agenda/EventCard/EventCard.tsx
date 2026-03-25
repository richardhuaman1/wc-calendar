"use client";

import { useRef, useState } from "react";
import { CalendarEvent, Selection } from "@/types/event";
import { TBD, SUPER_CUOTA_MARKET_TYPE_ID } from "@/utils/constants";
import Flag from "@/components/shared/Flag/Flag";
import OddsButton from "@/components/shared/OddsButton/OddsButton";
import ATIsotipoIcon from "@/components/shared/icons/ATIsotipoIcon";
import BetBuilderIcon from "@/components/shared/icons/BetBuilderIcon";
import PAIcon from "@/components/shared/icons/PAIcon";
import PlayIcon from "@/components/shared/icons/PlayIcon";
import StatsIcon from "@/components/shared/icons/StatsIcon";
import WorldCupLeagueIcon from "@/components/shared/icons/WorldCupLeagueIcon";
import styles from "./EventCard.module.scss";

const SWIPE_THRESHOLD = 50;

interface EventCardProps {
  event: CalendarEvent;
  isExpanded: boolean;
  onExpand: () => void;
  onOddsToggle: (
    selection: Selection,
    eventId: string,
    eventName: string,
    marketName: string
  ) => void;
  isSelected: (selectionId: string) => boolean;
}

function TeamName({ name }: { name: string }) {
  if (name === TBD) {
    return <span className={styles.nameTbd}>(Por definir)</span>;
  }
  return <>{name}</>;
}

function EventHeader({
  event,
  home,
  away,
}: {
  event: CalendarEvent;
  home: string;
  away: string;
}) {
  return (
    <div className={styles.info}>
      <div className={styles.nameRow}>
        <span className={styles.name}>
          <TeamName name={home} />
          {" vs "}
          <TeamName name={away} />
        </span>
        <span className={styles.group}>{event.groupName}</span>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.time}>{event.time}</span>
        <div className={styles.leagueInfo}>
          <span className={styles.leagueIcon}>
            <WorldCupLeagueIcon />
          </span>
          <span className={styles.league}>{event.league}</span>
        </div>
        <div className={styles.icons}>
          {event.hasStats && <StatsIcon />}
          {event.hasBetBuilder && <BetBuilderIcon />}
        </div>
      </div>
    </div>
  );
}

export default function EventCard({
  event,
  isExpanded,
  onExpand,
  onOddsToggle,
  isSelected,
}: EventCardProps) {
  const [activeMarketIdx, setActiveMarketIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);

  const homeName = event.participants.find((p) => p.role === "Home")?.name ?? TBD;
  const awayName = event.participants.find((p) => p.role === "Away")?.name ?? TBD;
  const hasTbd = homeName === TBD || awayName === TBD;

  const hasMarkets = event.markets.length > 0;
  const lastIdx = event.markets.length - 1;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  }

  function handleTouchMove(e: React.TouchEvent) {
    const deltaX = e.touches[0].clientX - touchStartX.current;

    if (activeMarketIdx === 0 && deltaX > 0) {
      setDragOffset(deltaX * 0.3);
      return;
    }
    if (activeMarketIdx === lastIdx && deltaX < 0) {
      setDragOffset(deltaX * 0.3);
      return;
    }

    setDragOffset(deltaX);
  }

  function handleTouchEnd() {
    setIsDragging(false);

    if (dragOffset < -SWIPE_THRESHOLD && activeMarketIdx < lastIdx) {
      setActiveMarketIdx((prev) => prev + 1);
    } else if (dragOffset > SWIPE_THRESHOLD && activeMarketIdx > 0) {
      setActiveMarketIdx((prev) => prev - 1);
    }

    setDragOffset(0);
  }

  const translateX = -(activeMarketIdx * 100);
  const dragPercent =
    hasMarkets && isDragging
      ? (dragOffset / (document?.documentElement?.clientWidth || 375)) * 100
      : 0;

  // ── Static card (TBD teams — no accordion) ─────────────────
  if (hasTbd) {
    return (
      <div className={styles.card}>
        <div className={styles.eventRow}>
          <EventHeader event={event} home={homeName} away={awayName} />
        </div>
      </div>
    );
  }

  // ── Interactive card (accordion + markets) ─────────────────
  return (
    <div className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}>
      {event.hasLiveStream && (
        <div
          className={`${styles.streamSection} ${isExpanded ? styles.streamSectionOpen : ""}`}
        >
          <div className={styles.streamInner}>
            <div className={styles.streamBanner}>
              <PlayIcon />
              <span className={styles.streamText}>
                Mira aquí la transmisión con Jorge Luna
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

          <div className={styles.participants}>
            {event.participants.map((p) => (
              <div key={p.id} className={styles.participantGroup}>
                <div className={styles.participantRow}>
                  <div className={styles.participantLeft}>
                    <Flag countryCode={p.countryCode} />
                    <span className={styles.participantName}>{p.name}</span>
                  </div>
                  {p.score !== undefined && (
                    <span className={styles.participantScore}>{p.score}</span>
                  )}
                </div>
                {p.isSponsored && (
                  <div className={styles.sponsorBadge}>
                    <span className={styles.sponsorText}>Patrocinador</span>
                    <ATIsotipoIcon />
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasMarkets && (
            <>
              <div
                className={styles.marketSlider}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`${styles.marketTrack} ${isDragging ? styles.marketTrackDragging : ""}`}
                  style={{
                    transform: `translateX(${translateX + dragPercent}%)`,
                  }}
                >
                  {event.markets.map((market) => (
                    <div key={market.id} className={styles.marketSlide}>
                      <div className={styles.marketRow}>
                        <span className={styles.marketName}>
                          {market.name}
                        </span>
                        {market.isEarlyPayout && <PAIcon />}
                        {market.typeId === SUPER_CUOTA_MARKET_TYPE_ID && (
                          <span className={styles.superCuotaBadge}>SC</span>
                        )}
                      </div>

                      <div className={styles.oddsRow}>
                        {market.selections.map((sel) => (
                          <OddsButton
                            key={sel.id}
                            odd={sel.odds}
                            label={sel.name}
                            isActive={isSelected(sel.id)}
                            isSuspended={sel.isDisabled}
                            onClick={() =>
                              onOddsToggle(
                                sel,
                                event.id,
                                event.name,
                                market.name
                              )
                            }
                            className={styles.oddsBtn}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.dots}>
                {event.markets.map((m, i) => (
                  <button
                    key={m.id}
                    className={`${styles.dot} ${i === activeMarketIdx ? styles.dotActive : ""}`}
                    onClick={() => setActiveMarketIdx(i)}
                    aria-label={m.name}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
