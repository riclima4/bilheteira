import React, { useEffect, useState } from "react";
import "./history.css";
import festivalImg from "../../assets/festivalEx.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Divider } from "@mui/material";

export default function History() {
  const [userID, setUserID] = useState();
  const [historico, setHistorico] = useState([]);
  const urlHistorico = "http://localhost:4242/api/history/";

  const getDataHistory = async (IDuser) => {
    const res = await axios.get(urlHistorico + IDuser);
    if (!res) return;
    setHistorico(res.data);
  };
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);
      getDataHistory(info.idUser);
    }
  }, []);

  return (
    <>
      <div className="flex tituloSection">
        <h1>Histórico de Compras</h1>
      </div>
      <div className="historico">
        {historico.map((item) => {
          return (
            <>
              <Divider />
              <div key={item} className="linha flex">
                <div className="leftSideLinha flex">
                  <img className="linhaImg" src={festivalImg} alt="userImg" />
                  <div className="linhaInfo">
                    <div className="firstCol">
                      <p>Evento: {item.eventTitle}</p>
                      <p>Bilhete: {item.ticketTitle}</p>
                      <p>Data do Bilhete: {item.ticketDate}</p>
                    </div>
                    <div className="secondCol">
                      <p>Data da compra: {item.date}</p>
                      <p>Hora da compra: {item.hour}</p>
                    </div>
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
              <Divider />
            </>
          );
        })}
      </div>
    </>
  );
}
