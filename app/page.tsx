import Header from "@/components/layout/Header/Header";
import CalendarShell from "@/components/layout/CalendarShell/CalendarShell";
import { fetchAllEvents } from "@/services/eventService";
import styles from "./page.module.scss";

export default async function Home() {
  const events = await fetchAllEvents();

  return (
    <div className={styles.layout}>
      <Header />
      <CalendarShell events={events} />
    </div>
  );
}
