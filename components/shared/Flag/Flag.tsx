import styles from "./Flag.module.scss";

interface FlagProps {
  countryCode: string;
}

export default function Flag({ countryCode }: FlagProps) {
  if (!countryCode) {
    return <div className={styles.placeholder} />;
  }

  return (
    <span className={`fi fi-${countryCode.toLowerCase()} ${styles.flag}`} />
  );
}
