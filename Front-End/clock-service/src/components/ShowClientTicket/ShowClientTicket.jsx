import React, { useEffect, useState } from 'react'
import ZeroTicket from '../ZeroTicket/ZeroTicket';
import { useDispatch, useSelector } from 'react-redux';
import { createClientTicketModeOn } from '../../utils/store/slices/isCreateClientTicketMode';
import axios from 'axios';
import ClientTicketsTable from '../ClientTicketsTable/ClientTicketsTable';

export default function ShowClientTicket() {
    const BACKEND_URL = "http://localhost:3000";
    const userData = useSelector((store) => store.userLogin.userLogin);
    const dispatch = useDispatch();
    const [tickets,setTickets] = useState([])
    const handleClickSubmitNewTicketBtn = ()=>{
        dispatch(createClientTicketModeOn())
    }
    useEffect(()=>{
        const api = `${BACKEND_URL}/tickets/customer`;
        axios({
            headers: {
                "content-type": "application/json",
                customerID: userData._id,
            },
            method: "get",
            url: api,
        })
            .then((response) => {
                setTickets(() => {return [...response.data]});
            })
            .catch((error) => console.log(error.response));
    },[userData._id])
    const generateTicketList = ()=>{
        if(tickets.length > 0){
            return <ClientTicketsTable tickets={tickets}/>;
        }
        return <ZeroTicket />;
    }
  return (
      <>
          <div className="header">
              <div className="header-texts">
                  <h2>پشتیبانی</h2>
                  <p>
                      راه ارتباطی اصلی شرکت ساعتی کاران با مشتریان سیستم تیکت
                      می‌باشد.
                  </p>
              </div>
              <div className="add-new-ticket-btn">
                  <button onClick={handleClickSubmitNewTicketBtn}>ثبت تیکت جدید</button>
              </div>
          </div>
          <div className="ticketsList">
              {generateTicketList()}
          </div>
      </>
  );
}
