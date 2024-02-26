import React from 'react'
import ZeroTicket from '../ZeroTicket/ZeroTicket';
import { useDispatch } from 'react-redux';
import { createClientTicketModeOn } from '../../utils/store/slices/isCreateClientTicketMode';

export default function ShowClientTicket() {
    const dispatch = useDispatch()
    const handleClickSubmitNewTicketBtn = ()=>{
        dispatch(createClientTicketModeOn())
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
              <ZeroTicket />
          </div>
      </>
  );
}
