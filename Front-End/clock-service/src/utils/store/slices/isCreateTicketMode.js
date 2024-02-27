import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCreateTicketMode: false,
};

export const isCreateTicketModeSlice = createSlice({
    name: "isCreateTicketMode",
    initialState,
    reducers: {
        createTicketModeOn: (state) => {
            state.isCreateTicketMode = true;
        },
        createTicketModeOff: (state) => {
            state.isCreateTicketMode = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { createTicketModeOn, createTicketModeOff } =
    isCreateTicketModeSlice.actions;

export default isCreateTicketModeSlice.reducer;
