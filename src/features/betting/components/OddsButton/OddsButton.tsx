"use client";

import styles from "./OddsButton.module.scss";

interface OddsButtonProps {
  label: string;
  odd: string;
  isActive?: boolean;
  isSuspended?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function OddsButton({
  label,
  odd,
  isActive = false,
  isSuspended = false,
  onClick,
  className,
}: OddsButtonProps) {
  const cls = [
    styles.button,
    isActive ? styles.active : "",
    isSuspended ? styles.suspended : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={cls}
      onClick={onClick}
      disabled={isSuspended}
      title={label}
    >
      <span className={styles.odd}>{odd}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
