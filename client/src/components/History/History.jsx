import React, { useEffect, useState } from "react";
import "./history.css";
import festivalImg from "../../assets/festivalEx.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function History() {
  const [userID, setUserID] = useState();
  const [historico, setHistorico] = useState([]);
  const urlHistorico = "http://localhost:4242/api/history";
  const urlTicketByID = "http://localhost:4242/api/tickets/";

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);
      getDataHistory();
    }
  }, []);
  const getDataHistory = async () => {
    const res = await axios.get(`${urlHistorico}/${userID}`);
    if (!res) return;
    setHistorico(res.data);
    console.log(res.data);
  };

  return (
    <>
      <div className="flex tituloSection">
        <h1>Histórico de Compras</h1>
      </div>
      <div className="historico">
        {historico.map((item) => {
          return (
            <div key={item} className="linha flex">
              <div className="leftSideLinha flex">
                <img className="linhaImg" src={festivalImg} alt="userImg" />
                <div className="linhaInfo">
                  <p>Titulo: {item.ticketTitle}</p>
                  <p>Data: {item.ticketDate}</p>
                </div>
              </div>
              <div className="rightSideLinha flex">
                <button className="seeMoreBtn">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button className="trashBtn">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
