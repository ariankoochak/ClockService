import React from "react";
import getNormalDate from "../../services/getNormalDate";
import { useDispatch } from "react-redux";
import { enterToTicketChatMode } from "../../utils/store/slices/ticketChatMode";

export default function ClientTicketsTable({ tickets }) {
    const dispatch = useDispatch()
    const handleClickTicket = (e)=>{
        const ticketId = e.currentTarget.getAttribute("id")
        dispatch(enterToTicketChatMode(ticketId))
    }
    const renderTickets = () => {
        tickets = tickets.reverse();
        return tickets.map((ticket) => {
            const ticketDate = getNormalDate(ticket.date)
            return (
                <>
                    <tr key={ticket._id} id={ticket._id} className="item" onClick={handleClickTicket}>
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
