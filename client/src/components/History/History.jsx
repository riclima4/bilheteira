import React, { useEffect, useState } from "react";
import "./history.css";
import festivalImg from "../../assets/festivalEx.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function History() {
  const [userID, setUserID] = useState();
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);
    }
  }, []);
  const urlHistorico = "http://localhost:4242/api/history/" + userID;
  const [historico, setHistorico] = useState([]);

  const getDataHistory = async () => {
    const res = await axios.get(urlHistorico);
    if (!res) return;
    setHistorico(res.data);
    console.log(urlHistorico);
  };
  useEffect(() => {
    getDataHistory();
  }, []);
  return (
    <>
      <div className="flex tituloSection">
        <h1>Histórico de Compras</h1>
      </div>
      <div className="historico">
        {/* {historico.map((item) => {
          return (
            <div className="linha flex">
              <div className="leftSideLinha flex">
                <img className="linhaImg" src={festivalImg} alt="userImg" />
                <div className="linhaInfo">
                  <p>Titulo: RockInRio</p>
                  <p>Local: Lisboa - Palco X </p>
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
        })} */}

        <div className="linha flex">
          <div className="leftSideLinha flex">
            <img className="linhaImg" src={festivalImg} alt="userImg" />
            <div className="linhaInfo">
              <p>Titulo: RockInRio</p>
              <p>Local: Lisboa - Palco X </p>
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
        <div className="linha flex">
          <div className="leftSideLinha flex">
            <img className="linhaImg" src={festivalImg} alt="userImg" />
            <div className="linhaInfo">
              <p>Titulo: RockInRio</p>
              <p>Local: Lisboa - Palco X </p>
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
        <div className="linha flex">
          <div className="leftSideLinha flex">
            <img className="linhaImg" src={festivalImg} alt="userImg" />
            <div className="linhaInfo">
              <p>Titulo: RockInRio</p>
              <p>Local: Lisboa - Palco X </p>
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
        <div className="linha flex">
          <div className="leftSideLinha flex">
            <img className="linhaImg" src={festivalImg} alt="userImg" />
            <div className="linhaInfo">
              <p>Titulo: RockInRio</p>
              <p>Local: Lisboa - Palco X </p>
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
      </div>
    </>
  );
}
