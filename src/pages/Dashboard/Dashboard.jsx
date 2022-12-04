import React from "react";
import "./dashboard.css";
import Ticket from "../../components/Ticket/Ticket";

export default function Dashboard() {
  return (
    <div className="DashboardContent">
      <h1 className="tituloText">Bem-vindos à PurpleTicket</h1>
      <h3 className="descText">Comprem bilhetes para os eventos disponíveis</h3>

      <Ticket />
    </div>
  );
}
