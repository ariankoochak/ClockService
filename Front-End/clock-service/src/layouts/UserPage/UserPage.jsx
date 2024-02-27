import React from "react";
import ShowTickets from "../../components/ShowTickets/ShowTickets";
import CreateTicket from "../../components/CreateTicket/CreateTicket";
import { useSelector } from "react-redux";
import TicketChats from "../../components/TicketChats/TicketChats";

export default function UserPage() {
    const isCreateTicketMode = useSelector(
        (state) => state.isCreateTicketMode.isCreateTicketMode
    );
    const isTicketChatMode = useSelector(
        (state) => state.ticketChatMode.isTicketChatMode
    );
    const generateMainClientPage = () => {
        if (isTicketChatMode) {
            return <TicketChats />
        } else {
            if (isCreateTicketMode)
                return (
                    <>
                        <CreateTicket />
                    </>
                );
            else
                return (
                    <>
                        <ShowTickets />
                    </>
                );
        }
    };
    return (
        <>
            <section className="container">
                <article className="main">{generateMainClientPage()}</article>
            </section>
        </>
    );
}
