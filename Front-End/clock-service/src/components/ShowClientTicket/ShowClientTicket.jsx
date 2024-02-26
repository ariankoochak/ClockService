import React from 'react'
import ZeroTicket from '../ZeroTicket/ZeroTicket';

export default function ShowClientTicket() {
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
                  <button>ثبت تیکت جدید</button>
              </div>
          </div>
          <div className="ticketsList">
              <ZeroTicket />
          </div>
      </>
  );
}
