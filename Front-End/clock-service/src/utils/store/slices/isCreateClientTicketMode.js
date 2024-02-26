import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCreateClientTicketMode: false,
};

export const isCreateClientTicketModeSlice = createSlice({
    name: "isCreateClientTicketMode",
    initialState,
    reducers: {
        createClientTicketModeOn: (state) => {
            state.isCreateClientTicketMode = true;
        },
        createClientTicketModeOff: (state) => {
            state.isCreateClientTicketMode = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { createClientTicketModeOn, createClientTicketModeOff } =
    isCreateClientTicketModeSlice.actions;

export default isCreateClientTicketModeSlice.reducer;
