import React from "react";
import "./history.css";
import festivalImg from "../../assets/festivalEx.jpg";

export default function History() {
  return (
    <>
      <div className="flex tituloSection">
        <h1>Histórico de Compras</h1>
      </div>
      <div className="historico">
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
