import React from 'react'
import { useDispatch } from 'react-redux';
import { exitToTicketChatMode } from '../../utils/store/slices/ticketChatMode';

export default function TicketChats() {
  const dispatch = useDispatch()
  const handleCancelFormClick = () => {
      dispatch(exitToTicketChatMode());
  };
  return (
      <div className="chat-page">
          <div className="exit-chat">
              <button onClick={handleCancelFormClick}>بازگشت</button>
          </div>

          <div className="chats-box"></div>

          <div className="chat-input">
              <div className="send-btn">
                  <button>ارسال</button>
              </div>
              <div className="chat-inp">
                  <input type="text" placeholder='متن پیام...'/>
              </div>
          </div>
      </div>
  );
}
