"use client";

import { CalendarEvent, OddsOption } from "@/types/event";
import { TBD } from "@/utils/constants";
import Flag from "@/components/shared/Flag/Flag";
import OddsButton from "@/components/shared/OddsButton/OddsButton";
import ATIsotipoIcon from "@/components/shared/icons/ATIsotipoIcon";
import BetBuilderIcon from "@/components/shared/icons/BetBuilderIcon";
import EarlyPayoutIcon from "@/components/shared/icons/EarlyPayoutIcon";
import PAIcon from "@/components/shared/icons/PAIcon";
import PlayIcon from "@/components/shared/icons/PlayIcon";
import StatsIcon from "@/components/shared/icons/StatsIcon";
import WorldCupLeagueIcon from "@/components/shared/icons/WorldCupLeagueIcon";
import styles from "./EventCard.module.scss";

interface EventCardProps {
  event: CalendarEvent;
  isExpanded: boolean;
  onExpand: () => void;
  onOddsToggle: (odd: OddsOption, eventId: string, eventName: string) => void;
  isOddSelected: (oddId: string) => boolean;
}

function TeamName({ name }: { name: string }) {
  if (name === TBD) {
    return <span className={styles.nameTbd}>(Por definir)</span>;
  }
  return <>{name}</>;
}

export default function EventCard({
  event,
  isExpanded,
  onExpand,
  onOddsToggle,
  isOddSelected,
}: EventCardProps) {
  const home = event.participants.find((p) => p.role === "Home");
  const away = event.participants.find((p) => p.role === "Away");

  const firstMarket = event.markets?.[0] ?? null;

  return (
    <div className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}>

      {event.hasLiveStream && (
        <div className={`${styles.streamSection} ${isExpanded ? styles.streamSectionOpen : ""}`}>
          <div className={styles.streamInner}>
            <div className={styles.streamBanner}>
              <PlayIcon />
              <span className={styles.streamText}>Mira aquí la transmisión con Jorge Luna</span>
            </div>
          </div>
        </div>
      )}

      <button className={styles.eventRow} onClick={onExpand}>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <span className={styles.name}>
              <TeamName name={home?.name ?? TBD} />{" vs "}<TeamName name={away?.name ?? TBD} />
            </span>
            <span className={styles.group}>{event.groupName}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.time}>{event.time}</span>
            <div className={styles.leagueInfo}>
              <span className={styles.leagueIcon}><WorldCupLeagueIcon /></span>
              <span className={styles.league}>{event.league}</span>
            </div>
            <div className={styles.icons}>
              {event.hasStats && <StatsIcon />}
              {event.hasBetBuilder && <BetBuilderIcon />}
              {event.isEarlyPayout && <EarlyPayoutIcon />}
            </div>
          </div>
        </div>
        <span className={`${styles.chevron} ${isExpanded ? styles.chevronUp : ""}`} />
      </button>

      <div className={`${styles.contentSection} ${isExpanded ? styles.contentSectionOpen : ""}`}>
        <div className={styles.contentInner}>
          <div className={styles.divider} />

          <div className={styles.participants}>
            {event.participants.map((p) => (
              <div key={p.id} className={styles.participantGroup}>
                <div className={styles.participantRow}>
                  <div className={styles.participantLeft}>
                    <Flag countryCode={p.country} />
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

          {firstMarket && (
            <>
              <div className={styles.marketRow}>
                <span className={styles.marketName}>{firstMarket.name}</span>
                <PAIcon />
              </div>

              <div className={styles.oddsRow}>
                {firstMarket.options.map((odd) => (
                  <OddsButton
                    key={odd.id}
                    odd={odd.value}
                    label={odd.label}
                    isActive={isOddSelected(odd.id)}
                    onClick={() => onOddsToggle(odd, event.id, event.name)}
                    className={styles.oddsBtn}
                  />
                ))}
              </div>
            </>
          )}

          <div className={styles.dots}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={`${styles.dot} ${i === 0 ? styles.dotActive : ""}`} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
