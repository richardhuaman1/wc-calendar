import CalendarShell from "@/features/calendar/components/CalendarShell/CalendarShell";
import { fetchAllEvents } from "@/features/calendar/services/eventService";

export default async function Home() {
  const events = await fetchAllEvents();

  return <CalendarShell events={events} />;
}
