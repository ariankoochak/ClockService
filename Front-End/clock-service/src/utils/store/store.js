import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./slices/userLogin";
import isCreateClientTicketMode from "./slices/isCreateClientTicketMode";
import ticketChatMode from "./slices/ticketChatMode";

export const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        isCreateClientTicketMode: isCreateClientTicketMode,
        ticketChatMode : ticketChatMode,
    },
});
