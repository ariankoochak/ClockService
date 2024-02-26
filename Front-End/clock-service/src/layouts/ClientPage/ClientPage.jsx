import React from "react";
import ShowClientTicket from "../../components/ShowClientTicket/ShowClientTicket";
import CreateClientTicket from "../../components/CreateClientTicket/CreateClientTicket";
import { useSelector } from "react-redux";

export default function ClientPage() {
    const isCreateClientTicketMode = useSelector((state)=>state.isCreateClientTicketMode.isCreateClientTicketMode)
    console.log(isCreateClientTicketMode);
    const generateMainClientPage = ()=>{
        if(isCreateClientTicketMode)
        return (
            <>
                <CreateClientTicket />
            </>
        );
        else return (
            <>
                <ShowClientTicket />
            </>
        );
    }
    return (
        <>
            <section className="container">
                <article className="main">
                    {generateMainClientPage()}
                </article>
            </section>
        </>
    );
}
