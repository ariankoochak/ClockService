import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logining } from "../../utils/store/slices/userLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const BACKEND_URL = "http://localhost:3000";
    let roles = ["مشتری", "اپراتور", "تعمیرکار"];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginRole, setLoginRole] = useState("مشتری");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isWrongLogin, setIsWrongLogin] = useState(false);

    const handleUserPassChanging = (e) => {
        if (e.target.type === "password") {
            setPassword(e.target.value);
        } else {
            setUserName(e.target.value);
        }
    };

    const generateOptionsButton = () => {
        roles = roles.filter((role) => {
            return role !== loginRole;
        });
        return (
            <>
                <button onClick={handleClickNewLoginRole}>
                    ورود {roles[0]}
                </button>
                <button
                    className="set-16-left-margin"
                    onClick={handleClickNewLoginRole}
                >
                    ورود {roles[1]}
                </button>
            </>
        );
    };

    const handleClickNewLoginRole = (e) => {
        const clickedRoleName = e.target.innerHTML.split(" ").pop();
        setLoginRole(clickedRoleName);
        setIsWrongLogin(false);
    };

    const persianRoleTranslator = (role) => {
        switch (role) {
            case "مشتری":
                return "client";
            case "اپراتور":
                return "operator";
            case "تعمیرکار":
                return "repairman";
            default:
                return "client";
        }
    };
    const handleSubmitClick = async () => {
      const role = persianRoleTranslator(loginRole)
        const api = `${BACKEND_URL}/login/${role}`;
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
          //TODO: add path to this switch for go to page after login
            dispatch(logining(requestResult));
            switch(role){
              case "client":
                navigate("/Client")
                break;
              case "operator":
                console.log("should go to operatorPage");
                break;
              case "repairman":
                console.log('should go to repairmanPage');
                break;
                default:
                  console.log('we have problem in loginPage.jsx');
            }
        }
    };
    return (
        <div className="login-page-main-div">
            <div className="header">
                <h4>سامانه ی گزارش خرابی ساعت</h4>
                <span>ورود به حساب کاربری {loginRole}</span>
            </div>
            <div className="main-form">
                <input
                    type="text"
                    placeholder="نام کاربری"
                    value={userName}
                    onChange={handleUserPassChanging}
                />
                <input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={handleUserPassChanging}
                />
                <button onClick={handleSubmitClick}>ورود</button>
                {isWrongLogin && (
                    <span className="wrong-password-alert">
                        نام کاربری یا رمز عبور اشتباه می باشد
                    </span>
                )}
            </div>
            <div className="splitter">
                <div className="line"></div>
                <span>یا</span>
                <div className="line"></div>
            </div>
            <div className="options">{generateOptionsButton()}</div>
        </div>
    );
}
