import React from "react";
import Admin from "../../components/Admin/Admin";
import History from "../../components/History/History";
import "./account.css";

export default function Account() {
  return (
    <div className="AccountContent">
      <h1 className="tituloText">Minha Conta</h1>
      <div className="userInfoRow flex">
        <img
          className="userImgAccount"
          src="https://www.w3schools.com/w3css/img_avatar3.png"
          alt="userImg"
        />
        <div className="userInfo">
          <h2>Nome: Ricardo Lima</h2>
          <h2>Email: ric.lima1@hotmail.com</h2>
          <h2>Contacto: 961746212</h2>
        </div>
      </div>
      <History />
      <Admin />
    </div>
  );
}
