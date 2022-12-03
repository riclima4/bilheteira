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
          <div className="flex titleAndDate">
            <h2>Titulo do Evento</h2>
            <h3>18/12/2022</h3>
          </div>
          <p>Local: Coliseu do Porto</p>
          <p>
            Descrição do evento Concerto Led zeppling onde te vais divertir ao
            maximo
          </p>
        </div>
        <div className="rightSide flex">
          <p>35.00€</p>
          <button>Comprar</button>
        </div>
      </div>
      <div className="tickets flex">
        <div className="leftSide">
          <div className="flex titleAndDate">
            <h2>Titulo do Evento</h2>
            <h3>18/12/2022</h3>
          </div>
          <p>Local: Coliseu do Porto</p>
          <p>
            Descrição do evento Concerto Led zeppling onde te vais divertir ao
            maximo
          </p>
        </div>
        <div className="rightSide flex">
          <p>35.00€</p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
}
