import React from 'react'

export default function LoginPage() {
  return (
    <div className="login-page-main-div">
        <div className="header">
         <h4>سامانه ی گزارش خرابی ساعت</h4>
         <span>ورود به حساب کاربری مشتری</span>
        </div>
        <div className="main-form">
          <input type="text" placeholder='نام کاربری'/>
          <input type="text" placeholder='رمز عبور' />
          <button>ورود</button>
        </div>
        <div className="splitter">
          <div className="line"></div>
          <span>یا</span>
          <div className="line"></div>
        </div>
        <div className="options">
          <button>ورود اپراتور</button>
          <button className='set-16-left-margin'>ورود تعمیرکار</button>
        </div>
    </div> 
  )
}
