import { STREAM_BANNER_TEXT } from "@/shared/constants/labels";
import PlayIcon from "@/shared/components/icons/PlayIcon";
import styles from "./EventCard.module.scss";

export default function StreamBanner() {
  return (
    <div className={styles.streamBanner}>
      <PlayIcon />
      <span className={styles.streamText}>{STREAM_BANNER_TEXT}</span>
    </div>
  );
}
