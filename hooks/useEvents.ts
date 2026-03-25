import { useEffect } from "react";
import {
  loadEvents,
  selectAllEvents,
  selectEventsError,
  selectEventsStatus,
} from "@/store/eventsSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export function useEvents() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const status = useAppSelector(selectEventsStatus);
  const error = useAppSelector(selectEventsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadEvents());
    }
  }, [dispatch, status]);

  return { events, status, error };
}
