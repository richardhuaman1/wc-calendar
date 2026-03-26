"use client";

import { ERROR_FALLBACK_MESSAGE, ERROR_RETRY } from "@/shared/constants/labels";
import styles from "@/styles/error.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <section className={styles.container} role="alert">
      <p className={styles.message}>
        {error.message || ERROR_FALLBACK_MESSAGE}
      </p>
      <button className={styles.retry} onClick={reset}>
        {ERROR_RETRY}
      </button>
    </section>
  );
}
