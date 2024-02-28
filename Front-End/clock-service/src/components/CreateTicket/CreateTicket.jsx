import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTicketModeOff } from '../../utils/store/slices/isCreateTicketMode';
import axios from 'axios';

export default function CreateClientTicket() {
    const BACKEND_URL = "http://localhost:3000";
    const dispatch = useDispatch();
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const userData = useSelector((store) => store.userLogin.userLogin);
    const handleCancelFormClick = ()=>{
        dispatch(createTicketModeOff())
    }

    const handleChangeTitle = (e)=>{
        setTitle(e.target.value)
    }

    const handleChangeBody = (e)=>{
        setBody(e.target.value)
    }

    const handleClickSubmit = async ()=>{
        const api = `${BACKEND_URL}/tickets`;
        const payload = {
            title: title,
            body: body,
        };
        const requestResult = await axios({
            headers: {
                "content-type": "application/json",
                userid: userData._id,
            },
            data: payload,
            method: "post",
            url: api,
        })
            .then((response) => response)
            .catch((error) => error.response);
        if(requestResult.status === 201){
            dispatch(createTicketModeOff())
        }
    }
  return (
    <>
    <div className="form">
        <div className="cancel-form">
            <button onClick={handleCancelFormClick}>بازگشت</button>
        </div>
        <div className="title">
            <input type="text" placeholder='عنوان تیکت' value={title} onChange={handleChangeTitle}/>
        </div>
        <div className="body">
            <textarea name="" id="" placeholder='متن تیکت' value={body} onChange={handleChangeBody}></textarea>
        </div>
        <div className="submit-btn">
            <button onClick={handleClickSubmit}>ارسال تیکت</button>
        </div>
    </div>
    </>
  )
}
