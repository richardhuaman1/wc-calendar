import CalendarShell from "@/components/layout/CalendarShell/CalendarShell";
import { fetchAllEvents } from "@/services/eventService";

export default async function Home() {
  const events = await fetchAllEvents();

  return <CalendarShell events={events} />;
}
