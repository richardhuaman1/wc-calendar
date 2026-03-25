"use client";

import { ERROR_FALLBACK_MESSAGE, ERROR_RETRY } from "@/utils/labels";
import styles from "@/styles/error.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        {error.message || ERROR_FALLBACK_MESSAGE}
      </p>
      <button className={styles.retry} onClick={reset}>
        {ERROR_RETRY}
      </button>
    </div>
  );
}
