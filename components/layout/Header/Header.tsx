import Logo from "@/components/shared/Logo/Logo";
import Avatar from "@/components/shared/Avatar/Avatar";
import ArrowDown from "@/components/shared/icons/ArrowDown";
import HamburgerIcon from "@/components/shared/icons/HamburgerIcon";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
      </div>

      <div className={styles.right}>
        <div className={styles.balance}>
          <span className={styles.amount}>S/ 200.00</span>
          <div className={styles.bonusRow}>
            <ArrowDown size={12} color="currentColor" />
            <span className={styles.bonus}>Bono S/ 0.00</span>
          </div>
        </div>

        <Avatar initials="A" />

        <button className={styles.reloadBtn}>Recargar</button>

        <button className={styles.menuBtn}>
          <HamburgerIcon />
        </button>
      </div>
    </header>
  );
}
