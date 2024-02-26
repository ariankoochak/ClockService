import React from "react";
import ShowClientTicket from "../../components/ShowClientTicket/ShowClientTicket";
import CreateClientTicket from "../../components/CreateClientTicket/CreateClientTicket";

export default function ClientPage() {
    return (
        <>
            <section className="container">
                <article className="main">
                    {/* <ShowClientTicket/> */}
                    <CreateClientTicket/>
                </article>
            </section>
        </>
    );
}
