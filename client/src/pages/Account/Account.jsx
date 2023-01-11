import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../../components/Admin/Admin";
import Footer from "../../components/Footer/Footer";
import History from "../../components/History/History";
import "./account.css";

export default function Account() {
  const [userInfo, setUserInfo] = useState({});
  const [userType, setUserType] = useState(1);
  const navi = useNavigate();
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwt(hasToken);
      setUserInfo(info);
      setUserType(info.type);
      // console.log(info);
    } else {
      navi("/login");
    }
  }, []);
  return (
    <div className="page-container">
      <div className="AccountContent">
        <h1 className="tituloText">Minha Conta</h1>
        <div className="userInfoRow">
          <img
            className="userImgAccount"
            src="https://www.w3schools.com/w3css/img_avatar3.png"
            alt="userImg"
          />
          <div className="userInfo">
            <h2>Nome: {userInfo.username}</h2>
            <h2>Email: {userInfo.email}</h2>
          </div>
        </div>
        <History />
        {userType === 100 ? <Admin /> : ""}
      </div>
      <Footer />
    </div>
  );
}
