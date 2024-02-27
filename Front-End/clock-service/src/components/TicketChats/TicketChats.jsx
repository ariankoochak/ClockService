import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { exitToTicketChatMode } from '../../utils/store/slices/ticketChatMode';
import axios from 'axios';
import ChatsRendering from '../ChatsRendering/ChatsRendering';

export default function TicketChats() {
  const BACKEND_URL = "http://localhost:3000";
  const ticketID = useSelector((state) => state.ticketChatMode.ticketId.payload);
  const [chats,setChats] = useState([])
  const dispatch = useDispatch()
  const handleCancelFormClick = () => {
      dispatch(exitToTicketChatMode());
  };
  useEffect(() => {
      const api = `${BACKEND_URL}/ticket/replies/all`;
      axios({
          headers: {
              "content-type": "application/json",
              ticketID: ticketID,
          },
          method: "get",
          url: api,
      })
          .then((response) => {
              setChats(() => {
                  return [...response.data];
              });
          })
          .catch((error) => console.log(error.response));
  }, [ticketID]);
  return (
      <div className="chat-page">
          <div className="exit-chat">
              <button onClick={handleCancelFormClick}>بازگشت</button>
          </div>

          <div className="chats-box">
            <ChatsRendering chats={chats}/>
          </div>

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
