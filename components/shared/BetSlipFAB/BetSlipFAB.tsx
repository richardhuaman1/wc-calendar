"use client";

import CouponIcon from "@/components/shared/icons/CouponIcon";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCount } from "@/store/betslipSlice";
import styles from "./BetSlipFAB.module.scss";

export default function BetSlipFAB() {
  const count = useAppSelector(selectCount);

  return (
    <button className={styles.fab} aria-label={`Cupón de apuestas${count > 0 ? `, ${count} selección${count !== 1 ? "es" : ""}` : ""}`}>
      <div className={styles.iconWrapper}>
        <CouponIcon />
        {count > 0 && (
          <span className={styles.badge}>{count}</span>
        )}
      </div>
      <span className={styles.label}>Cupón</span>
    </button>
  );
}
