import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { CalendarEvent } from "@/types/event";
import { fetchEvents } from "@/services/eventService";
import { KNOCKOUT_EVENTS } from "@/utils/mockEvents";

interface EventsState {
  items: CalendarEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadEvents = createAsyncThunk("events/load", async () => {
  const apiEvents = await fetchEvents();

  return [...apiEvents, ...KNOCKOUT_EVENTS].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
});

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error al cargar eventos";
      });
  },
});

export const selectAllEvents = (state: RootState) => state.events.items;
export const selectEventsStatus = (state: RootState) => state.events.status;
export const selectEventsError = (state: RootState) => state.events.error;

export default eventsSlice.reducer;
