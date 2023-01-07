import React, { useEffect, useState } from "react";
import "./eventPage.css";
import { Button, IconButton } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import festivalImg from "../../assets/festivalEx.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

export default function EventPage() {
  const { id } = useParams();
  const [ticketCard, setTicketCard] = useState();
  const urlEvents = "http://localhost:4242/api/event/" + id;
  const urlTickets = "http://localhost:4242/api/ticket/event/" + id;
  // const urlTicketByID = "http://localhost:4242/api/tickets/" + ticketCard;
  const [evento, setEvento] = useState({});
  const [ticketByEvent, setTicketByEvent] = useState([]);
  const [ticketByID, setTicketByID] = useState();

  const getDataEvent = async () => {
    console.log(urlEvents);
    const res = await axios.get(urlEvents);
    if (!res) return;
    setEvento(res.data);
  };
  const getDataTicketByEvent = async () => {
    console.log(urlTickets);
    const res = await axios.get(urlTickets);
    if (!res) return;
    setTicketByEvent(res.data);
    console.log(res.data);
  };
  // const getDataTicketByID = async () => {
  //   console.log(urlTicketByID);
  //   const res = await axios.get(urlTicketByID);
  //   if (!res) return;
  //   setTicketByID(res.data);
  //   console.log(res.data);
  // };

  useEffect(() => {
    getDataEvent();
    getDataTicketByEvent();
  }, []);

  return (
    <div className="page-container">
      <div className="EventPageContent">
        <div className="EventoContent">
          <img src={festivalImg} alt="imagemEvento" />
          <div className="infoEvento">
            <h1>{evento.title}</h1>
            <p>{evento.desc}</p>
            <h3>Local: {evento.local}</h3>
            <h3>Data: {evento.date}</h3>
            <h2>Vê a baixo os Bilhetes disponivéis</h2>
          </div>
        </div>
        <div className="backgroundCard">
          <div className="linhasTicket">
            {ticketByEvent.map((ticket) => {
              return (
                <div className="line" key={ticket.idTicket}>
                  <div className="ticketName">{ticket.title}</div>
                  <div className="ticketShow">
                    <IconButton
                      color="primary"
                      onClick={() => setTicketCard(ticket)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
          {ticketCard ? (
            <div className="ticketInfo">
              <h3>{ticketCard.title}</h3>
              <p>{ticketCard.hour}h</p>
              <p>{ticketCard.price}€</p>
              <Button variant="contained" endIcon={<ShoppingCartIcon />}>
                Comprar
              </Button>
            </div>
          ) : (
            <div className="ticketInfo">
              <h3>---------</h3>
              <p>-------</p>
              <p>----</p>
              <Button
                variant="contained"
                disabled
                endIcon={<ShoppingCartIcon />}
              >
                Comprar
              </Button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}