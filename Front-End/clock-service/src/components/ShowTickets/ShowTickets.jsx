import React, { useEffect, useState } from 'react'
import ZeroTicket from '../ZeroTicket/ZeroTicket';
import { useDispatch, useSelector } from 'react-redux';
import { createTicketModeOn } from '../../utils/store/slices/isCreateTicketMode';
import axios from 'axios';
import TicketsTable from '../TicketsTable/TicketsTable';
import { useNavigate } from 'react-router-dom';
import { logouting } from '../../utils/store/slices/userLogin';

export default function ShowTickets() {
    const BACKEND_URL = "http://localhost:3000";
    const userData = useSelector((store) => store.userLogin.userLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [tickets,setTickets] = useState([])
    const handleClickSubmitNewTicketBtn = ()=>{
        dispatch(createTicketModeOn())
    }
    const handleLogOutClickBtn = ()=>{
        dispatch(logouting());
        navigate('/Login');
    }
    useEffect(()=>{
        const api = `${BACKEND_URL}/tickets`;
        axios({
            headers: {
                "content-type": "application/json",
                userid: userData._id,
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
            return <TicketsTable tickets={tickets}/>;
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
                  <button className='add-ticket'onClick={handleClickSubmitNewTicketBtn}>
                      ثبت تیکت جدید
                  </button>
                  <button className='log-out' onClick={handleLogOutClickBtn}>
                      <i class="fa-regular fa-power-off"></i>
                  </button>
              </div>
          </div>
          <div className="ticketsList">{generateTicketList()}</div>
      </>
  );
}
