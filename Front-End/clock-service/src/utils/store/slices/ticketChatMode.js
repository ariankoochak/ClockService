import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTicketChatMode: false,
    ticketId: 0,
};

export const ticketChatModeSlice = createSlice({
    name: "ticketChatMode",
    initialState,
    reducers: {
        enterToTicketChatMode: (state, ticketId) => {
            state.isTicketChatMode = true;
            state.ticketId = ticketId;
        },
        exitToTicketChatMode: (state) => {
            state.isTicketChatMode = false;
            state.ticketId = 0;
        },
    },
});

// Action creators are generated for each case reducer function
export const { enterToTicketChatMode, exitToTicketChatMode } =
    ticketChatModeSlice.actions;

export default ticketChatModeSlice.reducer;
