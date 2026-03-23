import styles from "./OddsButton.module.scss";

interface OddsButtonProps {
  label: string;
  odd: string;
  isActive?: boolean;
  isSuspended?: boolean;
  onClick?: () => void;
}

export default function OddsButton({
  label,
  odd,
  isActive = false,
  isSuspended = false,
  onClick,
}: OddsButtonProps) {
  const className = [
    styles.button,
    isActive ? styles.active : "",
    isSuspended ? styles.suspended : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} onClick={onClick} disabled={isSuspended}>
      <span className={styles.label}>{label}</span>
      <span className={styles.odd}>{odd}</span>
    </button>
  );
}
