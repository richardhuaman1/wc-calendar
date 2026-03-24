"use client";

import { CalendarEvent } from "@/types/event";
import { TBD } from "@/utils/constants";
import { toggleSelection, selectIsSelected } from "@/store/betslipSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import Flag from "@/components/shared/Flag/Flag";
import ATIsotipoIcon from "@/components/shared/icons/ATIsotipoIcon";
import BetBuilderIcon from "@/components/shared/icons/BetBuilderIcon";
import EarlyPayoutIcon from "@/components/shared/icons/EarlyPayoutIcon";
import PAIcon from "@/components/shared/icons/PAIcon";
import PlayIcon from "@/components/shared/icons/PlayIcon";
import StatsIcon from "@/components/shared/icons/StatsIcon";
import WorldCupLeagueIcon from "@/components/shared/icons/WorldCupLeagueIcon";
import styles from "./EventCard.module.scss";

function TeamName({ name }: { name: string }) {
  if (name === TBD) {
    return <span className={styles.nameTbd}>(Por definir)</span>;
  }
  return <>{name}</>;
}

interface OddOption {
  id: string;
  value: string;
  label: string;
}

interface EventCardProps {
  event: CalendarEvent;
  isExpanded: boolean;
  onExpand: () => void;
}

interface OddsBtnProps {
  odd: OddOption;
  eventId: string;
  eventName: string;
}

function OddsBtn({ odd, eventId, eventName }: OddsBtnProps) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector(selectIsSelected(odd.id));

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(toggleSelection({
      id: odd.id,
      eventId,
      eventName,
      outcomeName: odd.label,
      odds: odd.value,
    }));
  }

  return (
    <button
      className={`${styles.oddsBtn} ${isSelected ? styles.oddsBtnActive : ""}`}
      onClick={handleClick}
      title={odd.label}
    >
      <span className={styles.oddsValue}>{odd.value}</span>
      <span className={styles.oddsLabel}>{odd.label}</span>
    </button>
  );
}

export default function EventCard({ event, isExpanded, onExpand }: EventCardProps) {
  const home = event.participants.find((p) => p.role === "Home");
  const away = event.participants.find((p) => p.role === "Away");

  const odds: OddOption[] = [
    { id: `${event.id}:home`, value: "1.45", label: home?.name ?? TBD },
    { id: `${event.id}:draw`, value: "2.00", label: "Empate" },
    { id: `${event.id}:away`, value: "2.25", label: away?.name ?? TBD },
  ];

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

          <div className={styles.marketRow}>
            <span className={styles.marketName}>Resultado del partido (1x2)</span>
            <PAIcon />
          </div>

          <div className={styles.oddsRow}>
            {odds.map((odd) => (
              <OddsBtn key={odd.id} odd={odd} eventId={event.id} eventName={event.name} />
            ))}
          </div>

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
