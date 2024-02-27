import React from 'react'
import getNormalHour from '../../services/getNormalHour';
import { useSelector } from 'react-redux';

export default function ChatsRendering({chats}) {
  const userData = useSelector((store) => store.userLogin.userLogin);
    const isThisUserSentMessageFunc = (senderID)=>{
        if(senderID === userData._id){
            return true
        }
        return false
    }
    const renderChats = ()=>{
        chats = chats.sort();
        return chats.map((chat)=>{
            const isThisUserSentMessage = (isThisUserSentMessageFunc(chat.customerID) || isThisUserSentMessageFunc(chat.senderID));
            return (<>
                <div className="main-message" key={chat._id} style={{direction : isThisUserSentMessage ? 'rtl' : 'ltr'}}>
                    <div className= {isThisUserSentMessage ? 'sender' : 'giver'}>
                        <span>{isThisUserSentMessage ? `${userData.CustomerFirstName}` : 'پشتیبان'}</span>
                        <p>{chat.body}</p>
                        <span>{getNormalHour(chat.date)}</span>
                    </div>
                </div>
            </>)
        })
    }
  return (
    <>
    {renderChats()}
    </>
  )
}
