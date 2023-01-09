import React from "react";
import Admin from "../../components/Admin/Admin";
import Footer from "../../components/Footer/Footer";
import History from "../../components/History/History";
import "./account.css";

export default function Account() {
  const isLogged = true;
  return (
    <div className="page-container">
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
        {isLogged ? <Admin /> : ""}
      </div>
      <Footer />
    </div>
  );
}
