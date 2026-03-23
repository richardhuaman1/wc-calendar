import styles from "./Avatar.module.scss";

interface AvatarProps {
  initials?: string;
}

export default function Avatar({ initials = "A" }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
