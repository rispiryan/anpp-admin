import { type RootState } from "../../../store/setupStore";

export const eventsLoadingSelector = (state: RootState) => state.events.loading;
export const eventsListSelector = (state: RootState) => state.events.eventsList;
export const eventsSelector = (state: RootState) => state.events.events;
