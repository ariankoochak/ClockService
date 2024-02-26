import React from "react";
import getNormalDate from "../../services/getNormalDate";

export default function ClientTicketsTable({ tickets }) {
    const renderTickets = () => {
        tickets = tickets.reverse();
        return tickets.map((ticket) => {
            const ticketDate = getNormalDate(ticket.date)
            return (
                <>
                    <tr key={ticket._id} className="item">
                        <td className={ticket.isClose ? "green-color" : "red-color"}>{ticket.isClose ? "بسته" : "باز"}</td>
                        <td>{ticket.title}</td>
                        <td>{ticketDate}</td>
                    </tr>
                </>
            );
        });
    };
    return (
        <>
            <table>
                <tr>
                    <th>وضعیت تیکت</th>
                    <th>عنوان</th>
                    <th>تاریخ</th>
                </tr>
                {renderTickets()}
            </table>
        </>
    );
}
