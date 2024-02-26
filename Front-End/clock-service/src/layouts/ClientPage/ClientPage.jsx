import React from "react";
import ShowClientTicket from "../../components/ShowClientTicket/ShowClientTicket";
import CreateClientTicket from "../../components/CreateClientTicket/CreateClientTicket";
import { useSelector } from "react-redux";
import ClientTicketChats from "../../components/ClientTicketChats/ClientTicketChats";

export default function ClientPage() {
    const isCreateClientTicketMode = useSelector(
        (state) => state.isCreateClientTicketMode.isCreateClientTicketMode
    );
    const isTicketChatMode = useSelector(
        (state) => state.ticketChatMode.isTicketChatMode
    );
    const generateMainClientPage = () => {
        if (isTicketChatMode) {
            return <ClientTicketChats />
        } else {
            if (isCreateClientTicketMode)
                return (
                    <>
                        <CreateClientTicket />
                    </>
                );
            else
                return (
                    <>
                        <ShowClientTicket />
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
