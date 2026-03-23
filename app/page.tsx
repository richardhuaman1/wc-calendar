import Header from "@/components/layout/Header/Header";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
      </main>
      <BetSlipFAB />
    </div>
  );
}
