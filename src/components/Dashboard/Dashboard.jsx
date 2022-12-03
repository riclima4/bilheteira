import React from "react";
import "./dashboard.css";
import ticketImg from "../../assets/ticket.png";

export default function Dashboard() {
  return (
    <div className="DashboardContent">
      <h1 className="tituloText">Bem-vindos à PurpleTicket</h1>
      <h3 className="descText">Comprem bilhetes para os eventos disponíveis</h3>
      <div className="tickets flex">
        <div className="leftSide">
          <h2>Titulo do Evento</h2>
          <p>Descrição do evento</p>
        </div>
        <div className="rightSide">Horario e INFO</div>
      </div>
    </div>
  );
}
