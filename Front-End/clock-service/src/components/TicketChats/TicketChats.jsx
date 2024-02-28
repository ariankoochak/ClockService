import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { exitToTicketChatMode } from '../../utils/store/slices/ticketChatMode';
import axios from 'axios';
import ChatsRendering from '../ChatsRendering/ChatsRendering';

export default function TicketChats() {
  const BACKEND_URL = "http://localhost:3000";
  const chatsBoxRef = useRef()
  const userData = useSelector((store) => store.userLogin.userLogin);
  const ticketID = useSelector((state) => state.ticketChatMode.ticketId.payload);
  const [chats,setChats] = useState([])
  const [messageInp,setMessageInp] = useState('')
  const dispatch = useDispatch()

  const handleChangeMessageInput = (e)=>{
    setMessageInp(e.target.value)
  }
  const handleCancelFormClick = () => {
      dispatch(exitToTicketChatMode());
  };

  const getRepliesFromServer = () => {
      const api = `${BACKEND_URL}/ticket/replies/all`;
      axios({
          headers: {
              "content-type": "application/json",
              ticketID: ticketID,
              userid : userData._id
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
  };

  const handleSendMessageClick = ()=>{
    const api = `${BACKEND_URL}/tickets/replies`;
    axios({
        headers: {
            "content-type": "application/json",
            "userid": userData._id,
        },
        data: {
            body: messageInp,
            ticketID: ticketID,
        },
        method: "post",
        url: api,
    })
        .then((response) => {
            if(response.status === 201){
              setMessageInp('')
              getRepliesFromServer();
            }
        })
        .catch((error) => console.log(error.response));
  }
  const testScroll = () => {
      chatsBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickCloseTicketBtn = ()=>{
    console.log(ticketID);
    const api = `${BACKEND_URL}/tickets/close`;
    axios({
        headers: {
            "content-type": "application/json",
            userid: userData._id,
            ticketID: ticketID,
        },
        method: "post",
        url: api,
    })
        .then((response) => {
            if (response.status === 204) {
                getRepliesFromServer();
            }
        })
        .catch((error) => console.log(error.response));
  }
  const renderChatInp = ()=>{
    if(chats[0]?.isClose){
        return(<>
            <div className="closed-ticket-alert">
                <h3>این تیکت بسته شده است</h3>
            </div>
        </>)
    }
    else{
        return (
            <>
                <div className="send-btn">
                    <button onClick={handleSendMessageClick}>ارسال</button>
                </div>
                <div className="chat-inp">
                    <input
                        type="text"
                        placeholder="متن پیام..."
                        value={messageInp}
                        onChange={handleChangeMessageInput}
                    />
                </div>
            </>
        );
    }
  }
  useEffect(() => {
      getRepliesFromServer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
      <div className="chat-page">
          <div className="exit-chat">
              <div className="left-side">
                  <button onClick={handleCancelFormClick}>بازگشت</button>
              </div>
              <div className="center-side">
                  <h2>{chats[0]?.title}</h2>
              </div>
              <div className="right-side">
                  {userData.role === "operator" && !(chats[0]?.isClose) &&(
                      <button className="close-ticket-btn" onClick={handleClickCloseTicketBtn}>بستن تیکت</button>
                  )}
              </div>
          </div>
          <div className="chats-box">
              {/*//FIXME: add usememo for prevent rerendering this component*/}
              <ChatsRendering chats={chats} />
              <div ref={chatsBoxRef}></div>
          </div>
          {testScroll()}
          <div className="chat-input">
              {renderChatInp()}
          </div>
      </div>
  );
}
