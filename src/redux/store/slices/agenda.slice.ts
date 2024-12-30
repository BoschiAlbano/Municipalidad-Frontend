import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { contacto } from "../../../components/contactos/model/contacto";

const INITIAL_STATE_DEFAULT: contacto[] = [];

export const agendaSlice = createSlice({
    name: "agenda",
    initialState: INITIAL_STATE_DEFAULT,
    reducers: {
        addAllItem: (_, action: PayloadAction<contacto[]>) => {
            return action.payload;
        },
        addItem: (state, action: PayloadAction<contacto>) => {
            state.push(action.payload);
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
            return state;
        },
        updateItem: (state, action: PayloadAction<contacto>) => {
            const index = state.findIndex(
                (contacto) => contacto.id == action.payload.id
            );

            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        resetItem: () => {
            return INITIAL_STATE_DEFAULT;
        },
    },
});

export default agendaSlice.reducer;

export const { addAllItem, addItem, updateItem, deleteItem, resetItem } =
    agendaSlice.actions;
