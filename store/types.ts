import type betslipReducer from "./betslipSlice";
import type eventsReducer from "./eventsSlice";

export type RootState = {
  betslip: ReturnType<typeof betslipReducer>;
  events: ReturnType<typeof eventsReducer>;
};
