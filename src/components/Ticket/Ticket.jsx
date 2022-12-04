import React from "react";
import "./ticket.css";

export default function Ticket() {
  return (
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
  );
}
