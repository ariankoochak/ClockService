import React, { useState } from 'react'

export default function LoginPage() {
  let roles = ['مشتری','اپراتور','تعمیرکار']
  const [loginRole,setLoginRole] = useState('مشتری');
  const generateOptionsButton = ()=>{
    roles = roles.filter((role)=>{
      return role !== loginRole
    })
    return (
        <>
            <button onClick={handleClickNewLoginRole}>ورود {roles[0]}</button>
            <button className="set-16-left-margin" onClick={handleClickNewLoginRole}>ورود {roles[1]}</button>
        </>
    );
  }
  const handleClickNewLoginRole = (e)=>{
    const clickedRoleName = e.target.innerHTML.split(" ").pop();
    setLoginRole(clickedRoleName)
  }
  return (
    <div className="login-page-main-div">
        <div className="header">
         <h4>سامانه ی گزارش خرابی ساعت</h4>
         <span>ورود به حساب کاربری {loginRole}</span>
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
          {generateOptionsButton()}
        </div>
    </div> 
  )
}
