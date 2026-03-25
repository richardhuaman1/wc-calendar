import Logo from "@/components/shared/Logo/Logo";
import Avatar from "@/components/shared/Avatar/Avatar";
import ArrowDown from "@/components/shared/icons/ArrowDown";
import HamburgerIcon from "@/components/shared/icons/HamburgerIcon";
import {
  HEADER_BALANCE,
  HEADER_BONUS,
  HEADER_RELOAD,
  HEADER_MENU_ARIA,
  HEADER_AVATAR_INITIALS,
} from "@/utils/labels";
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
          <span className={styles.amount}>{HEADER_BALANCE}</span>
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
