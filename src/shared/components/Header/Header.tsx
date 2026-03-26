import Logo from "@/shared/components/Logo/Logo";
import Avatar from "@/shared/components/Avatar/Avatar";
import ArrowDown from "@/shared/components/icons/ArrowDown";
import HamburgerIcon from "@/shared/components/icons/HamburgerIcon";
import BalanceDisplay from "./BalanceDisplay";
import {
  HEADER_BONUS,
  HEADER_RELOAD,
  HEADER_MENU_ARIA,
  HEADER_AVATAR_INITIALS,
} from "@/shared/constants/labels";
import styles from "./Header.module.scss";

const ARROW_SIZE = 12;

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
      </div>

      <div className={styles.right}>
        <div className={styles.balance}>
          <span className={styles.amount}><BalanceDisplay /></span>
          <div className={styles.bonusRow}>
            <ArrowDown size={ARROW_SIZE} color="currentColor" />
            <span className={styles.bonus}>{HEADER_BONUS}</span>
          </div>
        </div>

        <Avatar initials={HEADER_AVATAR_INITIALS} />

        <button className={styles.reloadBtn}>{HEADER_RELOAD}</button>

        <button className={styles.menuBtn} aria-label={HEADER_MENU_ARIA}>
          <HamburgerIcon />
        </button>
      </div>
    </header>
  );
}
