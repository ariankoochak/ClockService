import axios from 'axios';
import React, { useState } from 'react'

export default function LoginPage() {
  const BACKEND_URL = "http://localhost:3000";
  let roles = ['مشتری','اپراتور','تعمیرکار']
  const [loginRole,setLoginRole] = useState('مشتری');
  const [userName,setUserName] = useState('')
  const [password, setPassword] = useState('');

  const handleUserPassChanging = (e) => {
    if( e.target.type === 'password'){
      setPassword(e.target.value)
    }
    else{
      setUserName(e.target.value)
    }
  };

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

  const handleSubmitClick = ()=>{
    //FIXME: fix cors error in node js
    const api = `${BACKEND_URL}/login/client`
    console.log(api);
    // axios.get(api)
    //     .then((res) => console.log(res.data));
    const request = axios({
        headers: {
            "content-type": "application/json",
            "username" : userName,
            "password" : password
        },
        method: "get",
        url: api,
    })
        .then((response) => response.data)
        .catch((error) => error);
  }
  return (
    <div className="login-page-main-div">
        <div className="header">
         <h4>سامانه ی گزارش خرابی ساعت</h4>
         <span>ورود به حساب کاربری {loginRole}</span>
        </div>
        <div className="main-form">
          <input type="text" placeholder='نام کاربری' value={userName} onChange={handleUserPassChanging}/>
          <input type="password" placeholder='رمز عبور' value={password} onChange={handleUserPassChanging}/>
          <button onClick={handleSubmitClick}>ورود</button>
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
