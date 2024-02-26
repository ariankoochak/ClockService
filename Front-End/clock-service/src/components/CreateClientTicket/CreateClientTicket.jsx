import React from 'react'

export default function CreateClientTicket() {
  return (
    <>
    <div className="form">
        <div className="cancel-form">
            <button>بازگشت</button>
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
