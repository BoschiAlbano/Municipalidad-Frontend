import { configureStore } from "@reduxjs/toolkit";
import agendaSlice from "./slices/agenda.slice";

export const store = configureStore({
    reducer: {
        agenda: agendaSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
