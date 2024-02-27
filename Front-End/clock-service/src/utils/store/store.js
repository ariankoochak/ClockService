import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./slices/userLogin";
import isCreateTicketMode from "./slices/isCreateTicketMode";
import ticketChatMode from "./slices/ticketChatMode";

export const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        isCreateTicketMode: isCreateTicketMode,
        ticketChatMode : ticketChatMode,
    },
});
