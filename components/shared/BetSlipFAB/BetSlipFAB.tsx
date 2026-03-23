import CouponIcon from "@/components/shared/icons/CouponIcon";
import styles from "./BetSlipFAB.module.scss";

interface BetSlipFABProps {
  count?: number;
}

export default function BetSlipFAB({ count = 1 }: BetSlipFABProps) {
  return (
    <button className={styles.fab}>
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
