import React, { useEffect, useState } from "react";
import "./eventPage.css";
import Event from "../../components/Evento/Event";
import { Button, Grid, IconButton } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import festivalImg from "../../assets/festivalEx.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

export default function EventPage() {
  const { id } = useParams();
  const urlEvents = "http://localhost:4242/api/event/" + id;
  const urlTickets = "http://localhost:4242/api/ticket/event/" + id;
  const [evento, setEvento] = useState({});
  const [ticketByEvent, setTicketByEvent] = useState([]);

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
  };

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
            <h2>Vê a baixo os Bilhetes disponivéis</h2>
          </div>
        </div>
        <div className="backgroundCard">
          <div className="linhasTicket">
            <div className="line">
              <div className="ticketName">ticket1</div>
              <div className="ticketShow">
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
            <div className="line">
              <div className="ticketName">ticket1</div>
              <div className="ticketShow">
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
            <div className="line">
              <div className="ticketName">ticket1</div>
              <div className="ticketShow">
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
            <div className="line">
              <div className="ticketName">ticket1</div>
              <div className="ticketShow">
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="ticketInfo">
            <h3>Titulo Ticket</h3>
            <p>19H</p>
            <p>50€</p>
            <Button variant="contained" endIcon={<ShoppingCartIcon />}>
              Comprar
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
