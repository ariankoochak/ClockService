import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logining } from "../../utils/store/slices/userLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const BACKEND_URL = "http://localhost:3000";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShowPass,setIsShowPass] = useState(false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongLogin, setIsWrongLogin] = useState(false);

    const handleUsernameChanging = (e) => {
            setUserName(e.target.value);
    };
    const handlePasswordChanging = (e) => {
            setPassword(e.target.value);
    };

    const handleSubmitClick = async () => {
        const api = `${BACKEND_URL}/login`;
        console.log(api);
        const requestResult = await axios({
            headers: {
                "content-type": "application/json",
                username: userName,
                password: password,
            },
            method: "get",
            url: api,
        })
            .then((response) => response.data)
            .catch((error) => error.response);
        if (requestResult.status === 401) {
            setIsWrongLogin(true);
        } else {
            dispatch(logining({...requestResult}));
            navigate("/User")
        }
    };

    const changeShowPassword = ()=>{
        setIsShowPass(!isShowPass)
    }
    return (
        <div className="login-page-main-div">
            <div className="header">
                <h4>سامانه ی گزارش خرابی ساعت</h4>
                <span>ورود به حساب کاربری</span>
            </div>
            <div className="main-form">
                <input
                    type="text"
                    placeholder="نام کاربری"
                    value={userName}
                    onChange={handleUsernameChanging}
                />
                <input
                    type={isShowPass ? "text" : "password"}
                    placeholder="رمز عبور"
                    value={password}
                    onChange={handlePasswordChanging}
                />
                <i class={isShowPass ? "fa-light fa-eye-slash" : "fa-light fa-eye"} onClick={changeShowPassword}></i>
                <button onClick={handleSubmitClick}>ورود</button>
                {isWrongLogin && (
                    <span className="wrong-password-alert">
                        نام کاربری یا رمز عبور اشتباه می باشد
                    </span>
                )}
            </div>
        </div>
    );
}
