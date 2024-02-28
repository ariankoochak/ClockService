import React from "react";
import getNormalHour from "../../services/getNormalHour";
import { useSelector } from "react-redux";

export default function ChatsRendering({ chats }) {
    const userData = useSelector((store) => store.userLogin.userLogin);
    const isThisUserSentMessageFunc = (senderId) => {
        if (senderId === userData._id) {
            return true;
        }
        return false;
    };
    const roleTranslatorToPersian = (role)=>{
        switch(role){
            case 'client':
                return 'مشتری'
            case 'operator':
                return 'پشتیبان'
            case 'repairman':
                return 'تعمیرکار'
            default : 
                return 'معلوم نیست کیه'
        }
    }
    const renderChats = () => {
        chats = chats.sort();
        return chats.map((chat) => {
            const isThisUserSentMessage =
                isThisUserSentMessageFunc(chat.senderId);
            return (
                <>
                    <div
                        className="main-message"
                        key={chat._id}
                        style={{
                            direction: isThisUserSentMessage ? "rtl" : "ltr",
                        }}
                    >
                        <div
                            className={
                                isThisUserSentMessage ? "sender" : "giver"
                            }
                        >
                            <span>
                                {isThisUserSentMessage
                                    ? `${userData.firstName}`
                                    : `${roleTranslatorToPersian(chat.senderRole)}`}
                            </span>
                            <p>{chat.body}</p>
                            <span>{getNormalHour(chat.date)}</span>
                        </div>
                    </div>
                </>
            );
        });
    };
    return (
        <>
            {renderChats()}
        </>
    );
}
