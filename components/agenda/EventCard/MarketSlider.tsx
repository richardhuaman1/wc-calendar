"use client";

import { useRef } from "react";
import { IsSelectedFn, Market, OddsToggleFn } from "@/types/event";
import { SUPER_CUOTA_MARKET_TYPE_ID, SUPER_CUOTA_BADGE_LABEL } from "@/utils/constants";
import { useSwipe } from "@/hooks/useSwipe";
import OddsButton from "@/components/shared/OddsButton/OddsButton";
import PAIcon from "@/components/shared/icons/PAIcon";
import styles from "./EventCard.module.scss";

interface MarketSliderProps {
  markets: Market[];
  eventId: string;
  eventName: string;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function MarketSlider({
  markets,
  eventId,
  eventName,
  onOddsToggle,
  isSelected,
}: MarketSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { activeIndex, setActiveIndex, isDragging, translateX, handlers } =
    useSwipe({ total: markets.length, sliderRef });

  return (
    <>
      <div
        ref={sliderRef}
        className={styles.marketSlider}
        onTouchStart={handlers.onTouchStart}
        onTouchMove={handlers.onTouchMove}
        onTouchEnd={handlers.onTouchEnd}
      >
        <div
          className={`${styles.marketTrack} ${isDragging ? styles.marketTrackDragging : ""}`}
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {markets.map((market) => (
            <div key={market.id} className={styles.marketSlide}>
              <div className={styles.marketRow}>
                <span className={styles.marketName}>{market.name}</span>
                {market.isEarlyPayout && <PAIcon />}
                {market.typeId === SUPER_CUOTA_MARKET_TYPE_ID && (
                  <span className={styles.superCuotaBadge}>{SUPER_CUOTA_BADGE_LABEL}</span>
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
                      onOddsToggle(sel, eventId, eventName, market.name)
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
        {markets.map((m, i) => (
          <button
            key={m.id}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={m.name}
          />
        ))}
      </div>
    </>
  );
}
