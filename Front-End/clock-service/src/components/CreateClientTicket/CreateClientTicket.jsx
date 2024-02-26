import React from 'react'
import { useDispatch } from 'react-redux'
import { createClientTicketModeOff } from '../../utils/store/slices/isCreateClientTicketMode';

export default function CreateClientTicket() {
    const dispatch = useDispatch();
    const handleCancelFormClick = ()=>{
        dispatch(createClientTicketModeOff())
    }
  return (
    <>
    <div className="form">
        <div className="cancel-form">
            <button onClick={handleCancelFormClick}>بازگشت</button>
        </div>
        <div className="title">
            <input type="text" placeholder='عنوان تیکت'/>
        </div>
        <div className="body">
            <textarea name="" id="" placeholder='متن تیکت'></textarea>
        </div>
        <div className="submit-btn">
            <button>ارسال تیکت</button>
        </div>
    </div>
    </>
  )
}
