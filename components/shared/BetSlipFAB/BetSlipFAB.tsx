"use client";

import { useState, useCallback } from "react";
import CouponIcon from "@/components/shared/icons/CouponIcon";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCount } from "@/store/betslipSlice";
import { BETSLIP_LABEL, BETSLIP_ARIA_PREFIX } from "@/utils/labels";
import BetSlipModal from "@/components/shared/BetSlipModal/BetSlipModal";
import styles from "./BetSlipFAB.module.scss";

function buildAriaLabel(count: number): string {
  if (count === 0) return BETSLIP_ARIA_PREFIX;
  const plural = count !== 1 ? "es" : "";
  return `${BETSLIP_ARIA_PREFIX}, ${count} selección${plural}`;
}

export default function BetSlipFAB() {
  const count = useAppSelector(selectCount);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button className={styles.fab} aria-label={buildAriaLabel(count)} onClick={handleOpen}>
        <div className={styles.iconWrapper}>
          <CouponIcon />
          {count > 0 && (
            <span className={styles.badge}>{count}</span>
          )}
        </div>
        <span className={styles.label}>{BETSLIP_LABEL}</span>
      </button>

      {isOpen && <BetSlipModal onClose={handleClose} />}
    </>
  );
}
